const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
const breadSeedData = require('../models/baker_seed.js')

// INDEX
breads.get('/', async (req, res) => {
  await Bread.find()
  console.log("test breads", breads)
  .then(foundbreads => {
    res.render('index', {
      breads: foundBreads,
      title: 'Index Page'
      })
    })
   })

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
  .then(foundBakers=>{

    res.render('new', {
      bakers:foundBakers
    })
  })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
  .then (foundBakers =>{
    Bread.findById(req.params.id)
    .then (foundBread => {
      res.render('edit', {
        bread: foundBread,
        bakers: foundBakers
      })
    })
  })
})
    
// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id,req.body, { new: true })
  .then (updatedBread => {
    console.log(updatedBread)
    res.redirect (`/breads/${req.params.id}`)
  }) 
})
// NEW DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete (req.params.id)
  .then (deletedBread =>{
    res.status(303).redirect('/breads')
  })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
      .then(foundBread => {
            res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.send('404')
   })
  })


module.exports = breads
