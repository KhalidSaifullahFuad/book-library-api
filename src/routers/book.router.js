// Dependencies
const express = require("express");
const router = express.Router();

// Body Parser Middleware
router.use(express.json());

// Controllers
const bookController = require("../controllers/book.controller");

// Auth Middleware
const verify = require("../middlewares/auth.middleware")


// Routes
//--> GET - /api/book
router.get("/", bookController.get);

//--> GET - /api/book/:id
router.get("/:id", bookController.getById);

//--> POST - /api/book
router.post("/", verify, bookController.add);

//--> PUT - /api/book/:id
router.put("/:id", verify, bookController.update);

//--> DELETE - /api/book/:id
router.delete("/:id", verify, bookController.remove);


module.exports = router;