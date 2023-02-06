const shelf = document.getElementById("book_shelf");
const myBooks = document.getElementById("my_books");
const myPage = document.getElementById("my_page");

shelf.addEventListener("click", () => {
    window.open("http://localhost:3000/library/bookshelf");
})

myBooks.addEventListener("click", () => {
    window.open("http://localhost:3000/library/borrowedBooks");
})

myPage.addEventListener("click", () => {
    window.open("http://localhost:3000/library/myPage");
})
