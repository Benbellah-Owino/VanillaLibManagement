const table = document.getElementById("b_table")
axios.get('http://localhost:3000/lib/v1/user/getusers')
    .then((result) => {
        let users = result.data.data

        users.forEach(user => {
            let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            let td3 = document.createElement("td")
            let td4 = document.createElement("td")
            let td5 = document.createElement("td")
            let tr = document.createElement("tr")

            td1.textContent = user.username
            td2.textContent = user.email
            td3.textContent = user.phone
            td4.textContent = user.gender
            td5.textContent = user.books_borrowed

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)

            table.appendChild(tr)
        })
    })