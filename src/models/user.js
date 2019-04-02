'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  razon_social: String,
  prod_serv: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  status: { type: Boolean, default: false }
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) next(err)

      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
