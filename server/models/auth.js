const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local'  , 'google', 'facebook'],
    required: true
  },
  name: String,
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
   google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
     facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }

});

const User = mongoose.model('user', userSchema);
module.exports = User;