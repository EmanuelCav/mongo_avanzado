const socket = io();

const containMessage = document.getElementById("contain-message")

const addCart = document.querySelectorAll("#add-cart")

const products = document.querySelectorAll(".product")

addCart.forEach((element) => {

    element.addEventListener("click", () => {
    
        socket.emit("addCart", {id: element.getAttribute("name") })

        document.querySelectorAll(".contain-message").forEach((element) => {
            element.remove()
        })

        const message = document.createElement("p")
        message.innerText = "Producto agregado correctamente"
        containMessage.appendChild(message)
    
    })

})