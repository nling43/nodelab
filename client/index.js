const url = "http://localhost:3000/api/user/"
const container = document.getElementById("fromdb")
const bCreate = document.getElementById("bCreate")


function template(user) {
    return (
        `
    <div class="user-container">
        <input  type="text" id="name" name="name" placeholder="${user.name}">
        <input type="text" id="age" name="age" placeholder="${user.age}">
        <button id="u${user._id}" onclick="update(id);">Update</button>
        <button id="${user._id}" onclick="deleteUser(id)">Delete</button>
    </div>
    `
    )
}
async function reload() {
    container.innerHTML = ""
    const response = await fetch(url)
    const users = await response.json()
    users.forEach(user => {
        container.innerHTML += template(user)
    })
}

async function deleteUser(id) {
    const response = await fetch(
        url + id,
        {
            method: "DELETE"
        }
    )
    const toPrint = await response.json()
    wrtieResponse(toPrint)
    reload()
}

async function update(id) {
    const parent = document.getElementById(id).parentElement
    let name = parent.childNodes[1].value;
    if (!name) {
        name = parent.childNodes[1].attributes.placeholder.value
    }
    let age = parent.childNodes[3].value;
    if (!age) {
        age = parent.childNodes[3].attributes.placeholder.value
    }
    const response = await fetch(
        url + id.slice(1),
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": name, "age": age }),
            method: "PUT"
        }
    )
    wrtieResponse(await response.json())
    reload()
}

function clearlog() {
    const textarea = document.getElementById("text-log")
    textarea.value = ""

}
function wrtieResponse(res) {
    const textarea = document.getElementById("text-log")
    console.log(res);
    textarea.value = res.method + " " + res.code + " " + res.message + "\n" + textarea.value
}
bCreate.addEventListener("click", async () => {
    const response = await fetch(
        url,
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": document.getElementById("name").value, "age": document.getElementById("age").value }),
            method: "POST"
        }
    )
    wrtieResponse(await response.json())
    reload()
})
document.addEventListener("DOMContentLoaded", reload)

