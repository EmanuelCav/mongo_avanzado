const Product = require('../model/product');

class ProductDAO {

    async createProducts(product) {

        const newProduct = new Product(product)

        return await newProduct.save()

    }

    async getProducts(limit, page, sort, query) {

        const options = {
            page: Number(page),
            limit: Number(limit),
            sort,
            query,
            lean: true
        }

        const result = await Product.paginate({}, options)

        return {
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null,
        }
    }

    async getProductsId(id) {
        const product = await Product.findById(id)

        if (!product) {
            return
        }

        return product
    }

    async removeProduct(id) {

        const product = await Product.findById(id)

        if (!product) {
            return
        }

        const productRemove = await Product.findByIdAndDelete(id)

        return productRemove
    }

    async updateProduct(id, product) {

        const productUpdated = await Product.findById(id)

        if (!productUpdated) {
            return
        }

        const productUdpated = await Product.findByIdAndUpdate(id, product, {
            new: true
        })

        return productUdpated

    }

}

module.exports = ProductDAO