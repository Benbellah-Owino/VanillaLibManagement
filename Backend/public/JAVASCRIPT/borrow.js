var currentUrl = window.location.href;
let arr = currentUrl.split("=");
console.log(arr[1]);

const btn = document.getElementById("borrow_btn");
const days = document.getElementById("days");


const title = document.getElementById("title");
const author = document.getElementById("author");
const genre = document.getElementById("genre");
const edition = document.getElementById("edition");
const pages = document.getElementById("pages");
const publisher = document.getElementById("publisher");
const ISBN = document.getElementById("ISBN");


axios.get(`http://localhost:3000/lib/v1/book/getOneBook?id=${arr[1]}`)
    .then((response) => {
        let book = response.data.data
        title.textContent += `  ${book.title}`;
        author.textContent += `  ${book.author}`;
        genre.textContent += `  ${book.genre}`;
        edition.textContent += `  ${book.edition}`;
        pages.textContent += `  ${book.pages}`;
        publisher.textContent += ` ${book.publisher}`;

    }).catch(error => {
        console.log(error)
    })


btn.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/book/borrowBook", { book: arr[1], days: parseInt(days.value) })
        .then((response) => {
            console.log(response.data)
            window.open("http://localhost:3000/library/borrowedBooks", "_self");
        }).catch(err => console.log(err))
})