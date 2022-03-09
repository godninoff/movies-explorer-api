const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL = 'mongodb+srv://godninoff:214972Ag@cluster0.oo43b.mongodb.net/savedMovies',
  // 'mongodb://localhost:27017/bitfilmsdb'
  PORT = process.env.PORT || 3000,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  MONGO_URL,
  PORT,
};
