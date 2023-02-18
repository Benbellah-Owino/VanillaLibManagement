const section = document.getElementById("bookshelf")
const search = document.getElementById("search_bar")
let results
let borrow
let tiles
let empt = false
let booklist = []

//Function to create the search results div
function createResults(books) {
    const node = document.createElement("div")
    node.classList.add("results")
    node.classList.add("container")

    node.id = "results"

    // List the books in the results
    books.forEach(book => {
        const link = document.createElement("a")
        link.href = `http://localhost:3000/library/borrowBook?id=${book.book_id}`
        link.textContent = `${book.title}`
        node.appendChild(link)
    })

    document.body.appendChild(node)
    console.log(node)

    return node
}

//Function to show or hide the search results
function hide_showR(empty) {
    console.log(empty)

    if (empty == false) {
        results.style.display = "flex"

    } else if (empty == true) {
        results.style.display = "none"
    }
}

//Function to position the search results according to screen size. Though it's not dynamic
function addResultBar() {
    var rect = search.getBoundingClientRect();
    let x = rect.right
    let y = rect.top
    x -= 210
    y += 40

    results.style.left = `${x}px`
    results.style.top = `${y}px`

}


// Function to check if the search baqr is empty
function isEmpty(str) {
    return (!str || str.length === 0);
}

search.addEventListener("keyup", () => {

    if (isEmpty(search.value)) {
        empt = true
        hide_showR(empt)
        console.log(search.value + empt)
        return
    } else {
        if (results) {
            document.body.removeChild(results)
        }
        empt = false

        let books = booklist.filter((book) => {
            let title = book.title.toLowerCase()
            let searchVal = search.value.toLowerCase()

            return title.includes(searchVal)
        })
        results = createResults(books);


        addResultBar()
        hide_showR(empt)
    }
})

//Function to navigate to book borrowing page
function borrowBook(e) {
    let btnId = e.target.id;
    console.log(btnId)
    if (btnId) {
        window.open(`/library/borrowBook?id=${btnId}`)
    }
}


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
            booklist = response.data.data

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