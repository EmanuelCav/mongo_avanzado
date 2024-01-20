const Message = require('../model/message');

class MessageDAO {

    async createMessage(user, message) {

        const newMessage = await new Message({
            user,
            message
        })

        return await newMessage.save()

    }

    async getMessages() {

        return await Message.find()

    }

}

module.exports = MessageDAO