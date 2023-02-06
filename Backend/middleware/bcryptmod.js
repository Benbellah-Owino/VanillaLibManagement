const bcrypt = require("bcrypt");

const hashpassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt)

    return hashed
}

const compare = async (password, hash) => {
    let confirm = bcrypt.compare(password, hash, function (err, result) {
        return result
    });

    return confirm;
}

module.exports = {
    hashpassword,
    compare
}