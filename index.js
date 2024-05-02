// 1 importation
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config() // !env file

//2 initialisations
const app = express()
app.use(express.json())  // JSON data
app.use(cors()) // Allow access
app.use('/uploads' , express.static(__dirname+'/uploads'))

mongoose.connect(process.env.DB)
.then(()=>{
    console.log('Mongodb connected')
}).catch(err=>{
    console.log(err)
})



//routes 
require('./routes/feedbacks.routes')(app)
require('./routes/users.routes')(app)



//4 Lancement du serveur
app.listen(process.env.PORT , ()=>{
    console.log('run on port '+process.env.PORT) 
})