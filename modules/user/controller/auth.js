const { User } = require("../../../models");

const bcrypt = require("bcrypt");

const Validator = require("fastest-validator");
const v = new Validator();

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({ where: { username: username } });
        if (!userData) {
            return res.status(403).json({ message: "username or password is wrong" });
        }

        const verifyPassword = await bcrypt.compare(password, userData.password);
        if (!verifyPassword) {
            return res.status(403).json({ message: "username or password is wrong" });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.log({ message: error.message });
    }
};

const changePassword = async(req, res) => {
    const schema = {
        newPassword: { type: "string", min: 5 },
    };

    const validate = v.validate(req.body, schema);

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(403).json({ message: "user not found" });
        }

        const { oldPassword, newPassword, confirm } = req.body;

        const checkPassword = await bcrypt.compare(oldPassword, user.password);
        if (!checkPassword) {
            return res.status(403).json({ message: "password wrong" });
        }

        if (validate.length) {
            return res.status(404).json(validate);
        }

        if (newPassword !== confirm) {
            return res.status(403).json({ message: "new password is not the same as confirmation" });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await user.update({ password: passwordHash });
        res.status(200).json({ message: "password has been updated" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

module.exports = { loginUser, changePassword };