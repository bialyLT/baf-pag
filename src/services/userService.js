const users = require('../models/User');

exports.getUser = async (usr) => {

  return await users.findOne({ username: usr }).lean();

};

exports.getUserId = async (id) => {

  return await users.findById(id).lean();

};