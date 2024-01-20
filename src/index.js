const express = require('express')
const morgan = require('morgan')
const path = require('path');
const http = require('http');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
require('dotenv').config()

const CartManager = require('./dao/mongo/MongoCartManager')

const { port } = require('./config/config');

const app = express()
require('./database/database')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./views"));

app.set('port', port)

app.use(morgan('dev'))
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ extended: false, limit: '30mb' }))

app.use(require('./router/index.routes'))
app.use(require('./router/products.routes'))
app.use(require('./router/carts.routes'))
app.use(require('./router/messages.routes'))

app.use(express.static(path.join(__dirname, "../public")))

const httpServer = http.createServer(app)

httpServer.listen(port, () => {
    console.log("Server running on port " + port);
})

const cartManager = new CartManager()

const io = new Server(httpServer)

global.io = io

io.on('connection', async (socket) => {

    console.log("You are connected!");

    socket.on("addCart", async ({ id }) => {

        const cart = await cartManager.createCart()

        const cartProduct = await cartManager.addProduct(1, cart._id, id)

        console.log(cart._id);

        socket.emit("newProduct", cartProduct)

    })

})

