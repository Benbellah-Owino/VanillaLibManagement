const isAuth = require("../middleware/isAuth")
const uuid = require('uuid-with-v6');
const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'libdb',
    password: process.env.DB_PASSWORD,
})

client.connect();

const createBook = async (req, res) => {
    const book = req.body;

    const user = await isAuth(req);

    if (!user) {  //Check if user logged in
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    if (user.role != "admin") { //Check if user is the admin
        return res.status(403).json({ msg: "You are not authorized to access this service", status: "fail" });
    }
    else if (user.role == "admin") {

        let values = [book.genre, book.title, book.author, book.publisher, book.edition, book.ISBN, book.pages]// Defining values to enter to database

        let query = `INSERT INTO book(genre, title, author, publisher, edition, isbn,pages) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`

        //Database part
        client.query(query, values,) //Entering book details into database
            .then(async (result) => {
                console.log(result.rows[0]) // loging the created book

                res.status(201).json({ msg: "Book entered to the shelfves Succesfully", data: result.rows[0], status: "pass" }) //Returning the user
            }).catch(async (err) => {
                console.error(err.stack);
                res.status(400).json({ msg: "User Not Created", status: "fail" })
            })
    }
}



const getBooks = async (req, res) => {
    try {
        let value = ["false"] //Value
        let sql = `SELECT * FROM book WHERE borrowed = ($1);`  //Query definitions

        client.query(sql, value,)  //Gets all books that are not borrowed
            .then(async (result) => {

                return res.status(201).json({ msg: "Books retieved succesfully", data: result.rows, status: "pass" }) //Returning the user
            }).catch(async (err) => {
                console.error(err.stack);
                res.status(500).json({ msg: "Books retrieval failure. Don't worry the problems with us. Please try again", status: "fail" })
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Books retrieval failure. Don't worry the problems with us. Please try again", status: "fail" })
    }
}



const getOneBook = async (req, res) => {
    try {
        const { id } = req.query
        let value = [id] //Value
        let sql = `SELECT * FROM book WHERE book_id = ($1);`  //Query definitions

        client.query(sql, value,)  //Gets all books that are not borrowed
            .then(async (result) => {

                return res.status(201).json({ msg: "Book retieved succesfully", data: result.rows[0], status: "pass" }) //Returning the user
            }).catch(async (err) => {
                console.error(err.stack);
                res.status(500).json({ msg: "Books retrieval failure. Don't worry the problems with us. Please try again", status: "fail" })
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Books retrieval failure. Don't worry the problems with us. Please try again", status: "fail" })
    }
}



const borrow = async (req, res) => {

    let orderId = uuid.v6()

    try {
        const user = await isAuth(req);

        if (!user) {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        let order = req.body
        console.log(order)

        let values = [`true`, order.book];
        let values2 = [orderId, order.days, parseInt(user.id), order.book];
        let values3 = [user.id];

        console.log(orderId)
        let query1 = `UPDATE book SET borrowed = ($1) WHERE book_id = ($2)`
        let query2 = `INSERT INTO borrow_order (order_id, no_of_days, user_id, book_id) VALUES($1,$2,$3,$4) RETURNING *`
        let query3 = `UPDATE lib_user  SET books_borrowed = (books_borrowed + 1) WHERE user_id = ($1)`

        client.query(query1, values) //We update the book field to true to remove it from available book list
            .then(async (result) => {
                console.log(result.rows)
            }).catch((err) => {
                console.log(err.stack)
                return res.status(500).json({ msg: "Books borrowing failiure", status: "fail" })
            })

        client.query(query2, values2) //We then create a borrow order to keep track of this transaction 
            .then(async (result) => {
                console.log(result.rows)
            }).catch((err) => {
                console.log(err.stack)
                return res.status(500).json({ msg: "Books borrowing failiure", status: "fail" })
            })

        client.query(query3, values3) //We then create a borrow order to keep track of this transaction 
            .then(async (result) => {
                res.status(201).json({ msg: "Book borrowed succesfully", data: result.rows[0], status: "pass" })
            }).catch((err) => {
                console.log(err.stack)
                return res.status(500).json({ msg: "Books borrowing failiure", status: "fail" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Books borrowing failiure", status: "fail" })
    }
}

const returnBook = async (req, res) => {
    try {
        const user = await isAuth(req);

        if (!user) {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        if (user.role != "admin") {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        let order = req.body

        let values = [`false`, order.book];
        let values2 = ["closed", order.id];


        let query1 = `UPDATE book SET borrowed = ($1) WHERE book_id = ($2)`
        let query2 = `UPDATE borrow_order SET status = ($1) WHERE order_id = ($2)`
        client.query(query1, values) //We update the book field to true to return it from available book list
            .then(async (result) => {
                console.log(result.rows)
            }).catch((err) => {
                console.log(err.stack)
                res.status(500).json({ msg: "Books return fail", status: "fail" })
            })
        client.query(query2, values2) //We update the borrow transaction as closed 
            .then(async (result) => {
                res.status(201).json({ msg: "Book returned succesfully", data: result.rows[0], status: "pass" })
            }).catch((err) => {
                console.log(err.stack)
                res.status(500).json({ msg: "Book return failiure", status: "fail" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Book return failiure", status: "fail" })
    }
}

const myBorrowedBooks = async (req, res) => {
    try {
        const user = await isAuth(req);

        if (!user) {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }


        let query = `SELECT * FROM borrow_order WHERE user_id = ($1) AND status = ($2);`
        let value = [user.id, "active"]

        client.query(query, value)
            .then((result) => {
                return res.status(201).json({ msg: "Book orders retieved succesfully", data: result.rows, status: "pass" })
            }).catch(err => {
                console.log(err.stack)
                res.status(500).json({ msg: "Book orders retreival failed", status: "fail" })
            })
    } catch (error) {
        res.status(500).json({ msg: "Book orders retreival failed", status: "fail" })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const user = await isAuth(req);

        if (!user) {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        if (user.role != "admin") {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        let query = `SELECT * FROM borrow_order WHERE status = ($1);`
        let value = ["active"]

        client.query(query, value)
            .then((result) => {
                return res.status(201).json({ msg: "Book orders retieved succesfully", data: result.rows, status: "pass" })
            }).catch(err => {
                console.log(err.stack)
                res.status(500).json({ msg: "Book orders retreival failed", status: "fail" })
            })
    } catch (error) {
        res.status(500).json({ msg: "Book orders retreival failed", status: "fail" })
    }
}



const getTitle = async (req, res) => {
    try {
        const user = await isAuth(req);

        if (!user) {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        const { id } = req.query

        let query = `SELECT title FROM book WHERE book_id = ($1);`
        let value = [id]

        client.query(query, value)
            .then((result) => {
                return res.status(201).json({ data: result.rows[0], status: "pass" })
            }).catch(err => {
                console.log(err.stack)
                res.status(500).json({ msg: "Book orders retriveal failed", status: "fail" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Book orders retriveal failed", status: "fail" })
    }
}


const updateBook = async (req, res) => {
    const user = await isAuth(req)
    if (!user) {
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    if (user.role != "admin") {
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    try {
        let change = req.body
        let values = [change.value, change.id]   //Has the column/ cell to update and user Id
        let query = `UPDATE book SET ${change.field} = ($1) WHERE book_id = ($2) `  // A generic query that can change evry field in the table

        client.query(query, values)
            .then((result) => {
                console.log(result.rows[0])
                return res.status(200).json({ msg: "Book details updated succesfully", status: "pass" });
            }).catch((err) => {
                console.log(err.stack)
                return res.status(501).json({ msg: "Book details update failed", status: "fail" });
            })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Book details update failed", status: "fail" });
    }
}

const getSearch = async (req, res) => {
    try {
        const user = await isAuth(req);

        if (!user) {
            return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
        }

        const { letters } = req.query
        console.log(letters)

        let query = `SELECT * FROM book WHERE title LIKE ($1);`
        let value = [letters]

        client.query(query, value)
            .then((result) => {
                console.log(result.rows)
                return res.status(201).json({ msg: "query succesful", data: result.rows, status: "pass" })
            }).catch(err => {
                console.log(err.stack)
                res.status(500).json({ msg: "Query failed", status: "fail" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Query failed", status: "fail" })
    }
}


module.exports = {
    createBook,
    getBooks,
    borrow,
    getOneBook,
    myBorrowedBooks,
    getTitle,
    returnBook,
    getAllOrders,
    updateBook,
    getSearch
}