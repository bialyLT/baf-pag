const jwt = require('');
const fs = require('node:fs');

const key = fs.readFileSync('./keys/private.pem');
const signOptions = {
  expiresIn: '2h',
  algorithm: 'RS256'
};

export const createToken = (payload) => jwt.sign(payload, key, signOptions);