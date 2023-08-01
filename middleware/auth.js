const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = (req, res, next) => {
  // console.log(req.headers.authorization)
  // console.log(req.headers)
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provded')
  }
  const token = authHeader.split(' ')[1]
  // console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this page')
  }
}

module.exports = authenticationMiddleware
