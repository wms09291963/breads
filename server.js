// DEPENDENCIES
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
mongoose.connect('process.env.MONGO_URI', {useNewUrlParser: true, useUnifiedTopology: true},
()=> {console.log('connected to mongo:', process.env.MONGO_URI)}
)
// CONFIGURATION
const PORT = process.env.PORT;
const app = express();


// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!');
});

//Breads
const breadsController = require('./controllers/breads_controller.js');
app.use('/breads', breadsController)

//bakers
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
