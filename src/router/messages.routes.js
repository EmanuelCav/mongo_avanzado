const { Router } = require('express');

const { createCart, getMessages } = require('../controller/message.ctrl');

const router = Router()

router.post('/api/messages', createCart)

router.get('/api/messages', getMessages)

module.exports = router