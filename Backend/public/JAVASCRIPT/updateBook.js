const title = document.getElementById("title");
const author = document.getElementById("author");
const genre = document.getElementById("genre");
const ISBN = document.getElementById("ISBN");
const publisher = document.getElementById("pub");

const message = document.getElementById("message");


// All the buttons with one uset to enable the input fields and the other for saving them
const teb = document.getElementById("teb")
const tes = document.getElementById("tsb")
const aeb = document.getElementById("aeb")
const asb = document.getElementById("asb")
const geb = document.getElementById("geb")
const gsb = document.getElementById("gsb")
const ieb = document.getElementById("ieb")
const isb = document.getElementById("isb")
const peb = document.getElementById("peb")
const psb = document.getElementById("psb")

var currentUrl = window.location.href;
let arr = currentUrl.split("=");
console.log(arr[1]);

axios.get(`http://localhost:3000/lib/v1/book/getOneBook?id=${arr[1]}`)
    .then((result) => {
        const book = result.data.data
        console.log(book)
        title.value = book.title
        author.value = book.author
        genre.value = book.genre
        ISBN.value = book.isbn
        publisher.value = book.publisher


    }).catch(function (error) {
        console.log(error);
    })

teb.addEventListener("click", () => {
    title.disabled = !title.disabled
})

aeb.addEventListener("click", () => {
    author.disabled = !author.disabled
})

geb.addEventListener("click", () => {
    genre.disabled = !genre.disabled
})

ieb.addEventListener("click", () => {
    ISBN.disabled = !ISBN.disabled
})
peb.addEventListener("click", () => {
    publisher.disabled = !publisher.disabled
})


//This save the edited values 
tes.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/book/updateBook", { field: "title", value: title.value, id: arr[1] }) // The object contained the field to update and the value
        .then((result) => {
            console.log(result)
            title.disabled = !title.disabled
        })
        .catch(err => console.log(err))
})

asb.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/book/updateBook", { field: "author", value: author.value, id: arr[1] }) // The object contained the field to update and the value
        .then((result) => {
            console.log(result)
            author.disabled = true
        })
        .catch(err => console.log(err))
})

gsb.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/book/updateBook", { field: "genre", value: genre.value, id: arr[1] }) // The object contained the field to update and the value
        .then((result) => {
            console.log(result)
            genre.disabled = true
        })
        .catch(err => console.log(err))
})

isb.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/book/updateBook", { field: "isbn", value: ISBN.value, id: arr[1] }) // The object contained the field to update and the value
        .then((result) => {
            console.log(result)
            ISBN.disabled = true
        })
        .catch(err => console.log(err))
})

psb.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/book/updateBook", { field: "publisher", value: publisher.value, id: arr[1] }) // The object contained the field to update and the value
        .then((result) => {
            console.log(result)
            publisher.disabled = true
        })
        .catch(err => console.log(err))
})