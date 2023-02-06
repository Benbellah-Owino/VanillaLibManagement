
//All the input fields
const cname = document.getElementById("name");

const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const addressField = document.getElementById("addr");
const gender = document.getElementById("gender");
const message = document.getElementById("message");


// All the buttons with one uset to enable the input fields and the other for saving them
const neb = document.getElementById("neb")
const nes = document.getElementById("nsb")
const eeb = document.getElementById("eeb")
const ees = document.getElementById("esb")
const ceb = document.getElementById("ceb")
const csb = document.getElementById("csb")
const aeb = document.getElementById("aeb")
const asb = document.getElementById("asb")

// Filling Out The Fields
axios.get(`http://localhost:3000/lib/v1/user/userDetails`)
    .then((result) => {
        const user = result.data.data
        console.log(user)

        cname.value = user.username
        emailField.value = user.email
        phoneField.value = user.phone
        addressField.value = user.address
    }).catch(function (error) {
        console.log(error);
    })


//These block of code enable their respective input fields as the listen to the edit buttons
neb.addEventListener("click", () => {
    cname.disabled = false
})

eeb.addEventListener("click", () => {
    emailField.disabled = false
})

ceb.addEventListener("click", () => {
    phoneField.disabled = false
})

aeb.addEventListener("click", () => {
    addressField.disabled = false
})


//This save the edited values 
nes.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/user/updateuser", { field: "username", value: cname.value }) // The object contained the field to update and the value
        .then((result) => {
            console.log(result)
            emailField.disabled = false
        })
        .catch(err => console.log(err))
})

ees.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/user/updateuser", { field: "email", value: emailField.value })
        .then((result) => {
            console.log(result)
            emailField.disabled = false
        })
        .catch(err => console.log(err))
})

csb.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/user/updateuser", { field: "phone", value: phoneField.value })
        .then((result) => {
            console.log(result)
            emailField.disabled = false
        })
        .catch(err => console.log(err))
})

asb.addEventListener("click", () => {
    axios.post("http://localhost:3000/lib/v1/user/updateuser", { field: "address", value: addressField.value })
        .then((result) => {
            console.log(result)
            emailField.disabled = false
        })
        .catch(err => console.log(err))
})