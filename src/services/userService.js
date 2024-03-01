const users = require('../models/User');

exports.getUser = async (usr) => {

  return await users.findOne({ usr }).lean();

};