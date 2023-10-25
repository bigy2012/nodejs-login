const createError = require('http-errors')
const User = require('../Models/User.model')
const globals = require('../helpers/globals')

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper')

module.exports = {
  register: async (req, res, next) => {
    try {
      let result = await User.save(req.body);
      if (result) {
        res.json(globals.response(result, 'บันทึกข้อมูลสำเร็จ', []))
      } else {
        res.json(globals.response(result, 'ข้อมูลซ้ำ', []))
      }

    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      let result = await User.login(req.body);
      console.log(result)
      if (result) {
        res.json(globals.response(result, 'เข้าสู่ระบบสำเร็จ', []))
      } else {
        res.json(globals.response(result, 'ข้อมูลไม่ถูกต้อง', []))
      }
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      // client.DEL(userId, (err, val) => {
      //   if (err) {
      //     console.log(err.message)
      //     throw createError.InternalServerError()
      //   }
      //   console.log(val)
      //   res.sendStatus(204)
      // })
    } catch (error) {
      next(error)
    }
  },
}
