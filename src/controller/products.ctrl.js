const ProductDAO = require('../dao/mongo/MongoProductManager');

const productDao = new ProductDAO()

const products = async (req, res) => {

    const { limit = 10, page = 1, sort, query } = req.query

    try {

        const showProducts = await productDao.getProducts(limit, page, sort, query)

        return res.status(200).json(showProducts)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productGet = async (req, res) => {

    const { pid } = req.params

    try {

        const showProduct = await productDao.getProductsId(pid)

        if (!showProduct) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json(showProduct)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productCreate = async (req, res) => {

    const { title, description, code, price, status, stock, category } = req.body

    try {

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ message: "There are empty fields" })
        }

        let routeImages = []

        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                routeImages.push(req.files[i].path)
            }
        }

        const showProducts = await productDao.createProducts({
            title,
            description,
            code,
            price,
            status: status === undefined ? true : status,
            stock,
            category,
            thumbnails: req.files ? routeImages : []
        })

        global.io.emit("updateProducts", showProducts)

        return res.status(200).json({
            message: "Product added successfully",
            products: showProducts
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productUpdate = async (req, res) => {

    const { pid } = req.params

    try {

        const showProducts = await productDao.updateProduct(pid, req.body)

        if (!showProducts) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json({
            message: "Product updated succesfully",
            product: showProducts
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productDelete = async (req, res) => {

    const { pid } = req.params

    try {

        const showProduct = await productDao.removeProduct(pid)

        if (!showProduct) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        global.io.emit("updateProducts", showProduct)

        return res.status(200).json({ message: "Product removed sucessfully" })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    products,
    productGet,
    productCreate,
    productUpdate,
    productDelete
}