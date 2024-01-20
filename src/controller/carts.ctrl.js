const CartDAO = require('../dao/mongo/MongoCartManager');

const cartDao = new CartDAO()

const createCart = async (req, res) => {

    try {

        const cart = await cartDao.createCart()

        return res.status(200).json({
            message: "Cart added successfully",
            cart
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getCart = async (req, res) => {

    const { cid } = req.params

    const cart = await cartDao.getCartById(cid)

    if(!cart) {
        return res.status(200).json({ message: "Cart does not exists" })
    }

    return res.status(200).json(cart)

}

const addProductCart = async (req, res) => {

    const { quantity } = req.body
    const { cid, pid } = req.params

    const cart = await cartDao.addProduct(quantity, cid, pid)

    if(!cart) {
        return res.status(200).json({ message: "Cart or product does not exists" })
    }

    return res.status(200).json({
        message: "Product added successfully",
        cart
    })
}

const removeProductCart = async (req, res) => {

    const { cid, pid } = req.params

    const cart = await cartDao.removeProductFromCart(cid, pid)

    if(!cart) {
        return res.status(200).json({ message: "Cart or product does not exists" })
    }

    return res.status(200).json({
        message: "Product removed successfully",
        cart
    })
    
}

const modifyProductCart = async (req, res) => {

    const { cid } = req.params

    const cart = await cartDao.updateCartProducts(cid)

    if(!cart) {
        return res.status(200).json({ message: "Cart does not exists" })
    }

    return res.status(200).json({
        message: "",
        cart
    })
    
}

const quantityProductCart = async (req, res) => {

    const { cid, pid } = req.params
    const { quantity } = req.body

    const cart = await cartDao.updateQuantityProducts(quantity, cid, pid)

    if(!cart) {
        return res.status(200).json({ message: "Cart or product does not exists" })
    }

    return res.status(200).json({
        message: "Quantity updated successfully",
        cart
    })
    
}

const removeAllProducts = async (req, res) => {

    const { cid } = req.params

    const cart = await cartDao.removeAllProductsFromCart(cid)

    if(!cart) {
        return res.status(200).json({ message: "Cart does not exists" })
    }

    return res.status(200).json({
        message: "Products removed successfully",
        cart
    })

    
}

module.exports = {
    createCart,
    getCart,
    addProductCart,
    removeProductCart,
    modifyProductCart,
    quantityProductCart,
    removeAllProducts
}