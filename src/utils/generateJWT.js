const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const generateJWT = async (id) => {
  const payload = { id };
  const token = await promisify(jwt.sign)(
    payload,
    process.env.SECRET_JWT_SEED,
    {
      expiresIn: process.env.JWT_EXPIRE_IN,
    }
  );

  return token;
};

module.exports = generateJWT;
