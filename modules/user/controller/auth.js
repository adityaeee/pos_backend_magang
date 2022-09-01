const { User } = require("../../../models");

const bcrypt = require("bcrypt");
const e = require("express");

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({ where: { username: username } });
        if (!userData) {
            return res.status(403);
        }

        const verifyPassword = await bcrypt.compare(password, userData.password);
        if (!verifyPassword) {
            return res.status(403);
        }
        return res.send(userData);
    } catch (error) {
        console.log({ message: error.message });
    }
};

module.exports = { loginUser };