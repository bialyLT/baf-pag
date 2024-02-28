const { createToken } = require('../utils/auth');
const { getUser } = require('../../services/userService');

const auth = async (req, res) => {

  const { user } = req.body;
  const usr = await getUser(user);
  if (!usr) return res.status(401).json({ success: false, message: 'unauthrized' });
  const jwt = createToken({ id: usr._id, username: usr.username });
  return res.json({ success: true, message: 'authorized', jwt });
};

module.exports = auth;
