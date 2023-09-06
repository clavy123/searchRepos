const app = require('../server/app')
const connection = require('../server/config/database')
require('dotenv').config()

connection()


app.listen(5000,() => console.log("hello world"))