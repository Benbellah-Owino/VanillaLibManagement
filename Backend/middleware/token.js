const jwt = require("jsonwebtoken")


const signToken = (id, email, role) => {
    console.log(process.env.JSECRET)
    return jwt.sign({ id, email, role }, process.env.JSECRET, { expiresIn: "3d" });
}

const sendToken = (res, token) => {
    console.log(token)
    res.cookie("authtoken", token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000
    })
}

module.exports = {
    signToken,
    sendToken
}