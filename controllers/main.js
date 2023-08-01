const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Please provide either a user name or password')
  }
  const id = new Date().getDate()
  // this will consist of the payload, jwt secret and signoptions
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  // console.log(username, password)
  res.status(StatusCodes.OK).json({ msg: `user created`, token })
}

const dashboard = async (req, res) => {
  console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
