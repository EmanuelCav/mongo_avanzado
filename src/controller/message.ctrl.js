const MessageDAO = require('../dao/mongo/MongoMessageManager');

const messageDAO = new MessageDAO()

const createCart = async (req, res) => {

    const { message, user } = req.body

    try {

        const showMessage = await messageDAO.createMessage(user, message)

        return res.status(200).json(showMessage)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getMessages = async (req, res) => {

    try {

        const messages = await messageDAO.getMessages()

        return res.status(200).json(messages)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    createCart,
    getMessages
}