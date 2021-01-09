const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../.env')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')

module.exports = app => {
  
  const { User } = app.app.models.User

  // generate token
  const generateToken = (params = {}) => {
    return jwt.sign(params, jwt_key, {
      expiresIn: 86400
    })
  }

  // register
  const register = async (req, res) => {
    const { email } = req.body

    try {
      if(await User.findOne({ email })) {
        return res.status(400).send({ error: 'Usuário já cadastrado.' })
      }
      const user = new User(req.body)
      await user.save()

      user.password = undefined

      return res.send({ 
        user, 
        token: generateToken({ id: user.id })
      })

    } catch(err) {
      return res.status(400).send({ error: 'Falha ao registrar. Detalhes: '+err })
    }
  }

  // authenticate
  const auth = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    
    if(!user) {
      return res.status(400).send({ error: 'Usuário não encontrado.' })
    }

    if(!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Senha inválida.' })
    }

    user.password = undefined 

    res.send({ 
      user, 
      token: generateToken({ id: user.id })
    })
  }

  // user profile
  const userProfile = async (req, res) => {
    const user = await User.findOne({ _id : req.userId });

    if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado.'} )

    res.send({ ok: true, user})
  }

  // forgot password
  const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
      const user = await User.findOne({ email })

      if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado.'} )

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })

      mailer.sendMail({
        from: 'rodrigoengj@gmail.com',
        to: email,
        subject: 'Link para Resetar sua Senha ✔',
        text: `Utilize o token ${ token } para resetar sua senha`,
      }, (err) => {
        if(err)
          return res.status(400).send({ error: 'Não foi possível enviar o e-mail. Detalhes: '+err })

        return res.status(200).send({ message: "E-mail enviado com sucesso." })
      })
      
    } catch(err) {
      console.log(err)
      return res.status(400).send({ error: 'Error on forgot password, try again' })
    }
  }

  // reset password
  const resetPassword = async (req, res) => {
    const { email, token, password } =  req.body

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires')

      if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado.' })

      if(token !== user.passwordResetToken)
        return res.status(400).send({ error: 'Token inválido.' })

      const now = new Date()

      if(now > user.passwordResetExpires) 
        return res.status(400).send({ error: 'Token expirado, por favor gerar um novo token.'})

      user.password = password

      await user.save()

      res.status(200).send({ message: 'Senha atualizada com sucesso.'})
    } catch (err) {
      res.status(400).send({ error: 'Não foi possível resetar a senha, tente novamente. Detalhes: '+err })
    }
  }

  return { register, auth, userProfile, forgotPassword, resetPassword }
}