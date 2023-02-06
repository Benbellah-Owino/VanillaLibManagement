const name = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const gender = document.getElementById("gender")
const role = document.getElementById("role")
const numberOfBorrows = document.getElementById("borrows")
const edit = document.getElementById("edit")

edit.addEventListener("click", () => {
    window.open("/library/updateMyPage", "_self")
})

axios.get(`http://localhost:3000/lib/v1/user/userDetails`)
    .then((result) => {
        const user = result.data.data
        console.log(user)

        name.textContent = user.username
        email.textContent = user.email
        phone.textContent = user.phone
        gender.textContent = user.gender
        role.textContent = user.user_role
        numberOfBorrows.textContent = user.books_borrowed

    }).catch(function (error) {
        console.log(error);
    })