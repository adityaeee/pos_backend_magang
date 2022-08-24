//import express
const express = require('express');

const {
    getUserById,
    getUsers,
    createUser,
    updateUserById,
    deleteUserById
} = require('../controller/index');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;