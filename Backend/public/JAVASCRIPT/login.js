const form = document.getElementById("l_form");
const register = document.getElementById("register_btn")
const emailField = document.getElementById("email");
const passField = document.getElementById("pass")

let userRole;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
        email: emailField.value,
        password: passField.value,
    }

    console.log(user)

    axios.post("http://localhost:3000/lib/v1/user/loginUser", user)
        .then((response) => {
            const res = response.data
            if (res.status == "pass") {
                switch (res.role) {
                    case "admin":
                        localStorage.setItem("role", "admin")

                        window.open("http://localhost:3000/library/adminhome");
                        break;
                    case "user":
                        localStorage.getItem("role", "admin")
                        window.open("http://localhost:3000/library/home");
                    default:
                        break;
                }

                localStorage.setItem("loggedIn", "true")
            }
        }).catch((error) => {
            console.log(error)
        })
})