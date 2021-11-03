// ex 4.15
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    // const users = await User.find({})
    // ex 4.17
    const users = await User
    .find({}).populate('blogs', { title: 1, url: 1,  likes: 1, author: 1 })
    response.json(users.map(u => u.toJSON()))
  })

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
// ex 4.16
  if (body.password.length < 3 || body.password === undefined) {
      return response.status(400).json ({
          error: 'password missing or too short'
      })
  }

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter