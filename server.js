// DEPENDENCIES
const mongoose = require('mongoose')
const express = require('express')
const methodOverride = require('method-override')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

mongoose.connect('process.env.MONGO_URI', {useNewUrlParser: true, useUnifiedTopology: true},
()=> {console.log('connected to mongo:', process.env.MONGO_URI)}
)

// MIDDLEWARE

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

//Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
