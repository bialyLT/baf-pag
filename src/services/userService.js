const users = require('../models/userModel');

exports.getUser = async (usr) => {

  return await users.findOne({ usr }).lean();

};