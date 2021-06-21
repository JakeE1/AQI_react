const JWT = require('jsonwebtoken');
const User = require('../models/auth');
const { JWT_SECRET } = require('../configuration');
const bcrypt = require('bcryptjs');

signToken = user => {
  return JWT.sign({
    iss: 'Blasko', 
    sub: user.id,
    iat: new Date().getTime(), 
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    console.log(req);
    //const { email, password, name } = req.value.body; // json ?
    const { email, password, name } = req.body;
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      console.log(foundUser)
      return res.status(403).json({ error: 'Email is already in use' });
    }
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password
      },
      name
    });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newUser.local.password, salt);
    newUser.local.password = passwordHash;
    await newUser.save();
    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    console.log(req)
    //console.log(req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("name",req.user.name)
    res.json({ secret: req.user.name, id: req.user._id });
  }
}