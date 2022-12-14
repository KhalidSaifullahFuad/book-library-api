// Dependencies
const express = require("express");
const router = express.Router();

// Middleware
router.use(express.json());

// Controllers
const userController = require("../controllers/user.controller");

// Routes
router.get("/", userController.getAll);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

module.exports = router;