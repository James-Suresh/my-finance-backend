const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
const port = 5000
app.use(cors)
require('dotenv').config();

const uri = process.env.MDB_URI
console.log(uri)
async function connect(){
    try {
        await mongoose.connect(uri)
        console.log("Connected to mongodb")
    } catch (error) {
        console.error(error)
    }
}

connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connection.once('open',()=>{
    console.log("Connected to mongodb")
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})
