const socket = io();

const containerProducts = document.getElementById("container-products")

const addCart = document.querySelectorAll("#add-cart")

const products = document.querySelectorAll(".product")

addCart.forEach((element) => {

    element.addEventListener("click", () => {
    
        socket.emit("addCart", {id: element.getAttribute("name") })

        const message = document.createElement("p")
        message.innerHTML += "Producto agregado correctamente"
        containerProducts.appendChild(message)
    
    })

})