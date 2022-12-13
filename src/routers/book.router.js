// Dependencies
const express = require("express");
const router = express.Router();

// Body Parser Middleware
router.use(express.json());

// Controllers
const bookController = require("../controllers/book.controller");


// Routes
//--> GET - /api/book
router.get("/", bookController.get);

//--> GET - /api/book/:id
router.get("/:id", bookController.getById);

//--> POST - /api/book
router.post("/", bookController.add);

//--> PUT - /api/book/:id
router.put("/:id", bookController.update);

//--> DELETE - /api/book/:id
router.delete("/:id", bookController.remove);

router.use((req, res) => {
	res.status(404).json({
		message: "Invalid API Endpoint or Request Method",
	});
});

module.exports = router;