const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')

const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await User.find()
  res.render('index', {
    users
  })
})

router.post('/add', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.render('wellcome')
})

router.post('/signin', userCtrl.signIn, (req, res) => {
  res.render('wellcome')
})

router.get('/turn/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  user.status = !user.status
  await user.save()
  res.redirect('/')
})

module.exports = router
