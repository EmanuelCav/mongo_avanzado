const { Schema, model } = require('mongoose');

const messageSchema = new Schema({

    message: String,
    user: String

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Message', messageSchema)