const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

// Conecting to db
mongoose.connect(config.db)
  .then(db => console.log('db connected'))
  .catch(err => console.log(err))

// importing routes
const indexRoutes = require('./routes/index')

// settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routers
app.use('/', indexRoutes)

// starting the server
app.listen(config.port, () => {
  console.log(`Server on port ${config.port}`)
})
