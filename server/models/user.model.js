const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [7, "Username must be at least 7 characters long"],
    unique : [true, 'Username is already taken, try another.'],
  },
  email: {
    type: String,
    required: true,
    unique : [true, 'Email is already in use, try to log in.'],
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  hashedPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roles: [{
    type: String,
  }],
  emailVerified: {     
    type:Boolean, 
    default:false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationSecretToken: String, // used for email verification
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);

