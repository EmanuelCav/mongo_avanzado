const { Router } = require('express');

const ProductManager = require('../dao/mongo/MongoProductManager')
const CartManager = require('../dao/mongo/MongoCartManager')

const router = Router()

const ProductDAO = new ProductManager()
const CartDAO = new CartManager()

router.get('/products', async (req, res) => {

    const { limit = 10, page = 1, sort, query } = req.query

    const products = await ProductDAO.getProducts(limit, page, sort, query)

    res.render('products', {
        layout: 'home',
        products
    })
})

router.get('/carts/:cid', async (req, res) => {

    const { cid } = req.params

    const cart = await CartDAO.getCartById(cid)

    if(!cart) {
        return res.status({ message: "Cart does not exists" })
    }

    res.render('cartId', {
        layout: 'home',
        cart
    })
})

module.exports = router