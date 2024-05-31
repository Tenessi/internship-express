const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000
const DB = process.env.DB
const DB_STORAGE = process.env.DB_STORAGE

module.exports = {
    PORT,
    DB,
    DB_STORAGE
};