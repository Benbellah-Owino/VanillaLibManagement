const express = require("express")
const router = express.Router();
const { createBook, getBooks, borrow, returnBook, getOneBook, myBorrowedBooks, getTitle, getAllOrders, updateBook, getSearch } = require("../controllers/book")

router.post("/createBook", createBook);
router.post("/borrowBook", borrow);
router.get("/getBooks", getBooks);
router.get("/getOneBook", getOneBook);
router.get("/myorders", myBorrowedBooks);
router.get("/getTitle", getTitle);
router.get("/getAllOrders", getAllOrders);
router.get("/bookquery", getSearch);
router.post("/returnBook", returnBook);
router.post("/updateBook", updateBook);


module.exports = router