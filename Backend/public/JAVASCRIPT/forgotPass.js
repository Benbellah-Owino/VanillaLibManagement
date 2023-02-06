const emailField = document.getElementById("email")
const submit = document.getElementById("submit")

submit.addEventListener("click", () => {
    let email = emailField.value
    console.log(email)

    axios.post("http://localhost:3000/lib/v1/user/sendEmail", { email }).then((result) => console.log(result))
        .then(error => console.log(error))
})