//import model
const { User } = require("../../../models");

const bcrypt = require("bcrypt");

const Validator = require("fastest-validator");
const v = new Validator();

const getUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async(req, res) => {
    try {
        const userData = req.userData;
        const user = await User.findByPk(userData.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createUser = async(req, res) => {
    const schema = {
        id: { type: "string", min: 5, max: 10 },
        name: { type: "string", min: 5, max: 50 },
        username: { type: "string", min: 5, max: 25 },
        password: { type: "string", min: 5 },
        address: { type: "string", min: 5 },
        email: { type: "string" },
        phone: { type: "string", min: 11 },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(404).json(validate);
    }

    try {
        const password = req.body.password;
        const passwordHash = await bcrypt.hash(password, 10);
        const data = {...req.body, password: passwordHash };
        const createUser = await User.create(data);
        res.status(201).json(createUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateUserById = async(req, res) => {
    let user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ message: `user not found` });
    }

    const schema = {
        id: { type: "string", min: 5, max: 10, optional: true },
        name: { type: "string", min: 5, max: 50, optional: true },
        username: { type: "string", min: 5, max: 25, optional: true },
        // password: { type: "string", min: 5, optional: true },
        address: { type: "string", min: 5, optional: true },
        email: { type: "string", optional: true },
        phone: { type: "string", min: 11, optional: true },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(404).json(validate);
    }

    try {
        const { password } = user;
        const data = {...req.body, password: password };

        // updateUser = await User.update(req.body, { where: { id } });
        await user.update(data);
        res.status(200).json({ message: `the user has been updated` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUserById = async(req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: `data tidak ditemukan` });
    }

    try {
        await user.destroy();
        res.status(200).json({ message: "user deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getUserById, getUsers, createUser, updateUserById, deleteUserById };