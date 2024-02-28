const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');

const userModel = mongoose.model('users', userSchema, 'users');

module.exports = userModel;

