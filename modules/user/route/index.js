//import express
const express = require("express");

const { getUserById, getUsers, createUser, updateUserById, deleteUserById } = require("../controller/index");

const { loginUser, changePassword } = require("../controller/auth");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/login", loginUser);
router.put("/changePassword/:id", changePassword);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;