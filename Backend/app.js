const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
require("dotenv").config()


const path = require("path");

const userRouter = require("./router/users")
const bookRouter = require("./router/book")
const CORS = require("cors")

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(CORS());

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/public/STYLES"))
app.use("/lib/v1/user", userRouter)
app.use("/lib/v1/book", bookRouter)

//Frontend Routes
app.get("/library/login", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/loginform.html")
})
app.get("/library/register", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/register.html")
})
app.get("/library/adminhome", (req, res) => {
    res.sendFile(__dirname + "/public/ADMIN/adminHome.html")
})
app.get("/library/home", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/homepage.html")
})
app.get("/library/addbook", (req, res) => {
    res.sendFile(__dirname + "/public/ADMIN/addBook.html")
})
app.get("/library/getusers", (req, res) => {
    res.sendFile(__dirname + "/public/ADMIN/users.html")
})
app.get("/library/editbook", (req, res) => {
    res.sendFile(__dirname + "/public/ADMIN/editBook.html")
})
app.get("/library/bookshelf", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/books.html")
})
app.get("/library/borrowBook", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/borrowBook.html")
})
app.get("/library/myPage", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/myPage.html")
})
app.get("/library/updateMyPage", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/updateDetails.html")
})
app.get("/library/borrowedBooks", (req, res) => {
    res.sendFile(__dirname + "/public/HTML/borrowedBooks.html")
})
app.get("/library/allborrowedBooks", (req, res) => {
    res.sendFile(__dirname + "/public/ADMIN/allborrow.html")
})


app.get("/library/logout", (req, res) => {
    res.clearCookie("authtoken")
    res.send("Logged Out Succesfully")
})


app.listen(3000, async () => {

    console.log("Server is listening on port 3000");
})