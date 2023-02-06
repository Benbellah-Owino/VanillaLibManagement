const menu = document.querySelector("#mobile-menu");
const menuLink = document.querySelector("#mobile_menu");

const logout = document.querySelector(".logout")

menu.addEventListener("click", function () {
    var rect = menu.getBoundingClientRect();
    let x = rect.right
    x -= 80

    console.log(x)

    menuLink.style.left = `${x}px`
    menu.classList.toggle("is-active");
    menuLink.classList.toggle("lm_inactive");
})

logout.addEventListener("click", () => {
    localStorage.setItem("loggedIn", "false")
    localStorage.removeItem("role")
    axios.get(`http://localhost:3000/library/logout`).then((result) => {
        alert(result)
    })

})