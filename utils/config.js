// ex 4.2
// extracting handling of environment variables 
require('dotenv').config()

const PORT = process.env.PORT
// const MONGODB_URI = process.env.MONGODB_URI

// ex 4.8
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
