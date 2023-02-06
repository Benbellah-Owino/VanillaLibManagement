const form = document.getElementById("r_form");
const register = document.getElementById("register_btn")

//All the input fields
const firstName = document.getElementById("f_name");
const surname = document.getElementById("s_name");
const lastName = document.getElementById("l_name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const addressField = document.getElementById("addr");
const gender = document.getElementById("gender");
const password = document.getElementById("pass");
const confirmPassword = document.getElementById("c_pass");
const message = document.getElementById("message");

let emptyField = 0;
function ensureNotEmpty(field) {           //A function that check's if a value is missing
    if (field == null || field == "" || field == undefined) {
        emptyField = 1
    }
    return field;
}

//Dom documents
const pwFields = document.querySelectorAll(".password_div")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (password.value != confirmPassword.value) {
        console.log(password.value + "    " + confirmPassword.value)
        message.textContent = "Passwords don't match"
        message.classList.remove("message")
        message.classList.add("danger")
        password.classList.add("danger")
        confirmPassword.classList.add("danger")

        setTimeout(() => {
            message.classList.remove("danger")
            message.classList.add("message")
            password.classList.remove("danger")
            confirmPassword.classList.remove("danger")
        }, 5000)
    } else if (password.value === confirmPassword.value) {
        const user = {
            name: `${ensureNotEmpty(firstName.value)} ${ensureNotEmpty(surname.value)} ${lastName.value}`,
            email: `${ensureNotEmpty(emailField.value)}`,
            phone_no: `${ensureNotEmpty(phoneField.value)}`,
            address: `${ensureNotEmpty(addressField.value)}`,
            gender: `${ensureNotEmpty(gender.value)}`,
            password: password.value
        }

        if (emptyField) {
            message.textContent = "Fill all the fields "
            message.classList.remove("message")
            message.classList.add("danger")
            password.classList.add("danger")
            confirmPassword.classList.add("danger")

            setTimeout(() => {
                message.classList.remove("danger")
                message.classList.add("message")
                password.classList.remove("danger")
                confirmPassword.classList.remove("danger")
            }, 5000)
            console.log(user)
            console.log(emptyField)
            return;
        }
        else {
            console.log(user)
            axios.post("http://localhost:3000/lib/v1/user/registerUser", user)
                .then((response) => {
                    console.log(response)
                    window.open("/library/login", "_self")
                }).catch((error) => {
                    console.log(error)
                })

        }
    }
}
)

