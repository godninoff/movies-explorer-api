const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  MONGO_URL,
  PORT,
};