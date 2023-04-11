const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()

const bcrypt = require('bcrypt')
app.use(cors())
app.use(express.json());
const User = require('./models/User');
require('dotenv').config();
const port = process.env.PORT || 80
const uri = process.env.CUSTOMCONNSTR_MDB

async function connect(){
    try {
        await mongoose.connect(uri)
    } catch (error) {
        console.error(error)
    }
}

connect()
const users=[]

app.post('/users/register', async (req, res) => {

    const user = await User.findOne({username: req.body.username}).exec()
    if (user) {
        
      return res.status(400).send('User already exits')

    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const new_user = await User.create({ username: req.body.username, password: hashedPassword })
      console.log("test"+new_user)
      console.log(new_user.id)
      res.status(201).send("Account successfully created")
    } catch (err){
        console.log(err)
      res.status(500).send()
    }
  })

  

  app.post('/users/login', async (req, res) => {
    console.log(users)
    console.log("user login endpoint")
    const user = await User.findOne({username: req.body.username}).exec()
    if (!user) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        console.log('success') 
        res.status(201).json(
            {
                message: "Login Successful",
                username: user.username,
                id: user.id 
            }
        ) 
       
    } else {
        console.log('fail') 
        res.status(401).send('Wrong Password')
      }
    } catch {
        console.log('fail') 
      res.status(500).send()
    }
  })
  
  app.get('/', (req, res) => {
    res.send('MyFinance Server')
  })
  
mongoose.connection.once('open',()=>{
    console.log("Connected to mongodb")
    app.listen(port, () => {
      console.log(`MyFinance app listening on port ${port}`)
    })
   
})
