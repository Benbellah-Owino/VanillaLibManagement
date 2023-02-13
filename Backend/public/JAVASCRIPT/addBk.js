const form = document.getElementById("form")
const nameField = document.getElementById("title")
const authorField = document.getElementById("author")
const genreField = document.getElementById("genre")
const editionField = document.getElementById("edition")
const pagesField = document.getElementById("pages")
const ISBNField = document.getElementById("ISBN")
const publisherField = document.getElementById("publisher")

let emptyField = 0;
function ensureNotEmpty(field) {           //A function that check's if a value is missing
    if (field == null || field == "" || field == undefined) {
        emptyField = 1
    }
    return field;
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let book = {
        title: `${ensureNotEmpty(nameField.value)}`,
        author: `${ensureNotEmpty(authorField.value)}`,
        genre: `${ensureNotEmpty(genreField.value)}`,
        edition: `${ensureNotEmpty(editionField.value)}`,
        pages: `${ensureNotEmpty(pagesField.value)}`,
        ISBN: `${ensureNotEmpty(ISBNField.value)}`,
        publisher: `${ensureNotEmpty(publisherField.value)}`
    }

    if (emptyField != 0) {
        console.log("No")
    } else {
        axios.post("http://localhost:3000/lib/v1/book/createBook", book)
            .then((response) => {
                console.log(response)
                window.open("http://localhost:3000/library/bookshelf", "_self");
            }).catch((error) => {
                console.log(error)
            })
    }
})