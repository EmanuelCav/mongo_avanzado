const Cart = require('../model/cart');
const ProductCart = require('../model/productCart');
const Product = require('../model/product');

const ProductManager = require('../mongo/MongoProductManager')

const productManager = new ProductManager()

class CartDAO {

    async createCart() {

        const newCart = await new Cart()

        return await newCart.save()

    }

    async getCartById(cid) {

        const cart = await Cart.findById(cid).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        if (!cart) {
            return
        }

        return cart

    }

    async addProduct(quantity, cid, pid) {

        const cart = await Cart.findById(cid).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        if (!cart) {
            return
        }

        const product = await Product.findById(pid)

        if (!product) {
            return
        }

        const newProductCart = new ProductCart({
            quantity,
            cart: cid,
            product: pid
        })

        const productCartSaved = await newProductCart.save()

        const productAdded = await Cart.findByIdAndUpdate(cid, {
            $push: {
                products: productCartSaved._id
            }
        }, {
            new: true
        }).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        return productAdded

    }

    async removeProductFromCart(cid, pid) {

        const cart = await Cart.findById(cid)

        if (!cart) {
            return
        }

        const product = await ProductCart.findById(pid)

        if (!product) {
            return
        }

        const productRemoved = await Cart.findByIdAndUpdate(cid, {
            $pull: {
                products: product._id
            }
        }, {
            new: true
        }).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        await ProductCart.findByIdAndDelete(pid)

        return productRemoved

    }

    async updateCartProducts(cid) {

        const cart = await Cart.findById(cid)

        if (!cart) {
            return
        }

        const products = await productManager.getProducts()

        const cartUpdated = await Cart.findByIdAndUpdate(id, {
            $set: {
                products
            }
        }).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        return cartUpdated

    }

    async updateQuantityProducts(quantity, cid, pid) {

        const product = await ProductCart.findById(pid)

        if (!product) {
            return
        }

        await ProductCart.findByIdAndUpdate(pid, {
            quantity
        }, {
            new: true
        })

        const cart = await Cart.findById(cid).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        if (!cart) {
            return
        }

        return cart

    }

    async removeAllProductsFromCart(cid) {

        const cart = await Cart.findById(cid)

        if (!cart) {
            return
        }

        await ProductCart.deleteMany({
            cart: cid
        })

        const productsRemoved = await Cart.findByIdAndUpdate(cid, {
            $set: {
                products: []
            }
        }, {
            new: true
        }).populate({
            path: "products",
            populate: {
                path: "product"
            }
        })

        return productsRemoved

    }

}

module.exports = CartDAO