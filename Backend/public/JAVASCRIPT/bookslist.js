const section = document.getElementById("bookshelf")
const search = document.getElementById("search_bar")
let borrow
let tiles

function borrowBook(e) {
    let btnId = e.target.id;
    console.log(btnId)
    if (btnId) {
        window.open(`/library/borrowBook?id=${btnId}`)
    }
}

search.addEventListener("change", () => {
    console.log(1)
    axios.get(`http://localhost:3000/lib/v1/book/bookquery?letters=${search.value}`)
        .then(function (response) {
            let books = response.data.data
            books.forEach(book => { console.log(books) })
        })
})



function editBook(e) {
    let role = localStorage.getItem("role")

    if (role == "admin") {
        let id = e.target.id
        if (id) {
            window.open(`/library/editBook?id=${id}`)
        }
    }
}

function populate() {
    axios.get('http://localhost:3000/lib/v1/book/getBooks')
        .then(function (response) {
            let books = response.data.data
            books.forEach(book => {

                const parent = document.createElement("div")
                parent.classList.add("book_tile");
                parent.classList.add("container");
                parent.id = book.book_id

                const article = document.createElement("article");
                article.classList.add("book_info")

                const title = document.createElement("h3")
                const author = document.createElement("h3")
                const genre = document.createElement("h3")
                const edition = document.createElement("h3")
                const pages = document.createElement("h3")

                title.textContent = book.title;
                author.textContent = book.author;
                genre.textContent = book.genre;
                edition.textContent = book.edition;
                pages.textContent = book.pages;

                article.appendChild(title);
                article.appendChild(author);
                article.appendChild(genre);
                article.appendChild(edition);
                article.appendChild(pages);

                const button = document.createElement("button");
                button.classList.add("borrow")

                const i = document.createElement("i");
                i.classList.add("fa-solid")
                i.classList.add("fa-cart-shopping")

                button.appendChild(i)
                button.id = book.book_id

                article.appendChild(button)

                parent.appendChild(article);
                console.log(parent)
                section.append(parent);
            });

            borrow = document.querySelectorAll(".borrow")
            tiles = document.querySelectorAll(".book_tile")
            borrow.forEach(br => {
                br.addEventListener("click", borrowBook)
            });
            tiles.forEach(tl => {
                tl.addEventListener("dblclick", editBook)
            });

        })
        .catch(function (error) {
            console.log(error);
        })
}


populate()



// const menu = document.querySelector("#mobile-menu");
// const menuLink = document.querySelector("#mobile_menu");

// menu.addEventListener("click", function () {
//     var rect = menu.getBoundingClientRect();
//     let x = rect.right
//     x -= 80

//     console.log(x)

//     menuLink.style.left = `${x}px`
//     menu.classList.toggle("is-active");
//     menuLink.classList.toggle("lm_inactive");

// })