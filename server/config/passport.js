const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
 
module.exports = function(passport){
  
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, 
    async (email, password, done) => {
      let user = await User.findOne({$or: [{email: email}, {username: email} ]})
      //let user = await User.findOne({ email });
      //try{
        if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
          console.log("15", "not user")
          return done(null, false, { message:'user not activated yet, please contact admin'});

          return done(null, false, { message: 'Your login details could not be verified. Please try again.' });
          throw (
            {
              "type":"Login error.",
              "details" : "Wrong login credentials. Please try again."
            }
          )
        }
     // }//catch(err){
      //return done(null, false, err );

        //return( {"error":{"type":err.type, "details":err.details}} )
      //}
      if(user)
      user = user.toObject();
      delete user.hashedPassword;
      delete user.emailVerificationSecretToken
      delete user.passwordResetExpires;
      delete user.passwordResetToken;
      return done(null, user);
  }));


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    user = user.toObject();
    delete user.hashedPassword;
    delete user.emailVerificationSecretToken
    delete user.passwordResetExpires;
    delete user.passwordResetToken;
    done(err, user);
  });
});
}

//module.exports = passport;

/*
The purpose of passport.session middleware is to deserialize user object from session using  
passport.deserializeUser function (that you define in your passport configuration). When user 
first authenticates itself, its user object is serialized and stored in the session. On each following 
request, the middleware deserialize the user and populates req.user object. 
*/


