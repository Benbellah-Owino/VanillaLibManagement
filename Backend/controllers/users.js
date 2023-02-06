const { hashpassword, compare } = require("../middleware/bcryptmod")
const { signToken, sendToken } = require("../middleware/token")
const isAuth = require("../middleware/isAuth")
const forgo = require("../middleware/forgPass")

const bcrypt = require("bcrypt");
const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'libdb',
    password: process.env.DB_PASSWORD,
})

client.connect();

const createUser = async (req, res) => {
    const user = req.body;

    //User is entered into database
    let password = user.password

    try {

        //Hashing user provided password
        hashpassword(password).then((result) => {


            let values = [`${user.name}`, `${user.email}`, `${user.phone_no}`, `${user.gender}`, `${result}`, "user", `${user.address}`]// Defining values to enter to database
            client.query(`INSERT INTO lib_user(username, email, phone, gender, password, user_role,address) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`, values) //Quering the database to create the user
                .then(result => {

                    console.log(result.rows[0]) // loggin the created user

                    return res.status(201).json({ msg: "User Created Succesfully", data: result.rows[0], status: "pass" }) //Returning the user
                })
                .catch(e => {
                    console.error(e.stack);

                    return res.status(400).json({ msg: "User Not Created", status: "fail" })
                })

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "User Not Created", status: "fail" })
    }

}


const loginUser = async (req, res) => {
    const user = req.body

    let values = [`${user.email}`]     // This is a postgre's nodejs query syntax
    const sql1 = `SELECT * FROM lib_user WHERE "email" = ($1);`;
    console.log(user.email)

    try {
        client.query(sql1, values)
            .then(async (result) => {
                console.log(result.rows[0])
                let dbUser = result.rows[0];

                const isRegisterdUser = await bcrypt.compare(user.password, dbUser.password)
                console.log(isRegisterdUser)

                if (isRegisterdUser) {
                    const token = signToken(dbUser.user_id, dbUser.email, dbUser.user_role); //Sign a JWT token
                    sendToken(res, token); //Set the token as an authentication cookie


                    return res.status(202).json({ msg: "Succesful", status: "pass", role: dbUser.user_role });

                } else if (!isRegisterdUser) {

                    return res.status(400).json({ msg: "Failed", status: "fail" })
                }
            })   //Get user from database
            .catch(err => {
                console.log(err.stack)
                return res.status(400).json({ msg: "Failed" }) //If their is an error return failed message and console log the error
            })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "Failed" })
    }
}

const userDetails = async (req, res) => {
    const user = await isAuth(req);

    if (!user) {  //Check if user logged in
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    try {

        let query = `SELECT * FROM lib_user WHERE user_id=($1)`
        let values = [user.id]

        client.query(query, values)
            .then((result) => {
                res.status(200).json({ msg: "User details retrieved succesfully", data: result.rows[0], status: "pass" });
            }).catch((err) => {
                console.log(err.stack);
                res.status(500).json({ msg: "User details retrieval failed. Please try again", status: "fail" });
            })
    } catch (error) {
        res.status(500).json({ msg: "User details retrieval failed. Please try again", status: "fail" });
    }
}

const updateUser = async (req, res) => {
    const user = await isAuth(req);

    if (!user) {  //Check if user logged in
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    try {
        let change = req.body
        let values = [change.value, user.id]   //Has the column/ cell to update and user Id
        let query = `UPDATE lib_user SET ${change.field} = ($1) WHERE user_id = ($2) `  // A generic query that can change evry field in the table

        client.query(query, values)
            .then((result) => {
                console.log(result.rows[0])
                return res.status(200).json({ msg: "User details updated succesfully", status: "pass" });
            }).catch((err) => {
                console.log(err.stack)
                return res.status(501).json({ msg: "User details update failed", status: "fail" });
            })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "User details update failed", status: "fail" });
    }
}

const sendFogorEmail = (req, res) => {
    const email = req.body.email
    console.log(email)
    try {
        forgo(email, "http://localhost:3000/library/register")
    } catch (error) {
        console.log(error)
    }

}


const getAllUsers = async (req, res) => {
    const user = await isAuth(req);

    if (!user) {
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    if (user.role != "admin") {
        return res.status(401).json({ msg: "Please login or register to access this service", status: "fail" });
    }

    let query = `SELECT * FROM lib_user`;

    client.query(query)
        .then((result) => {
            res.status(200).json({ msg: "Users retrieved succesfully", data: result.rows, status: "pass" })
        }).catch((err) => {
            err.stack
            return res.status(501).json({ msg: "Users retrieval failed", status: "fail" });
        })
}

module.exports = {
    createUser,
    loginUser,
    userDetails,
    updateUser,
    sendFogorEmail,
    getAllUsers
}