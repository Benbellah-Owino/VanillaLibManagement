const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {


    try {
        const { authtoken } = req.cookies;

        if (!authtoken) {
            console.log('Please login to access the data');
        }
        else {
            const verify = jwt.verify(authtoken, process.env.JSECRET);
            return verify
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = verifyToken;