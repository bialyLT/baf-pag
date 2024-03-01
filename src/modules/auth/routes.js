const express = require('express');
const router = express.Router();
const { auth } = require('./controller');

router.post('/auth', auth);

module.exports = router;