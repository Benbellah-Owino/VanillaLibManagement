const addBook = document.getElementById("add_books");
const borrowedBooks = document.getElementById("borrowed_books")
const catalogue = document.getElementById("catalogue")
const myPage = document.getElementById("my_page")
const users = document.getElementById("users")

catalogue.addEventListener("click", () => {
    window.open("http://localhost:3000/library/bookshelf");
})

addBook.addEventListener("click", () => {
    window.open("http://localhost:3000/library/addbook");
})

borrowedBooks.addEventListener("click", () => {
    window.open("http://localhost:3000/library/allborrowedBooks");
})

myPage.addEventListener("click", () => {
    window.open("http://localhost:3000/library/myPage");
})

users.addEventListener("click", () => {
    window.open("http://localhost:3000/library/getusers");
})

