const table = document.getElementById("table")

function createTable(order) {
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let th = document.createElement("tr")

    axios.get(`http://localhost:3000/lib/v1/book/getTitle?id=${order.book_id}`)
        .then(function (response) {
            td1.textContent = response.data.data.title
            console.log(response.data.data)
        })

    let date = order.return_date
    // date =date.split("T")[0]

    date = new Date(date.split("T")[0])
    let day = new Date(order.return_date) - Date.now()
    day = day / (1000 * 3600 * 24);
    day = Math.trunc(day)
    date = date.toString()
    td2.textContent = `${date.split(" ")[0]} ${date.split(" ")[1]} ${date.split(" ")[2]} ${date.split(" ")[3]}`
    td3.textContent = day

    th.appendChild(td1)
    th.appendChild(td2)
    th.appendChild(td3)

    table.appendChild(th)
}

axios.get('http://localhost:3000/lib/v1/book/myorders')
    .then(function (response) {
        let orders = response.data.data

        console.log(orders)
        orders.forEach(order => {
            createTable(order)
        });
    })