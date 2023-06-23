const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');

module.exports = {
  jwtSecret,
  database: {
    host: 'localhost',
    port: 27017,
    name: 'aansim',
    username: 'your-username',
    password: 'your-password',
  },
  server: {
    port: 3000,
  },
};
