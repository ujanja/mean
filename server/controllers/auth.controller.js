const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const randomstring = require('randomstring');


const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {

  // register logic
  register: async function(req, res, next, error ){
    User.findOne({username: req.body.username}, async function(err, __user){
      try {
        if(__user)
          throw (
              {
                "type":"Registration Error",
                "details" : `The username "${__user.username}" is already taken. Try another one.`
              }
          )
      } catch(err) {
        return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
      }
    
    User.findOne({email: req.body.email}, async function(err, _user){
      try {
        if(_user)
          throw (
              {
                "type":"Registration Error",
                "details" : "User with the same email : '" + _user.email + "' already exsists. Try to login."
              }
          )
      } catch(err) {
        return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
      }
      
        if(!_user && !__user){
            user = await Joi.validate(req.body, userSchema, { abortEarly: false });
            user.hashedPassword = bcrypt.hashSync(user.password, 10);
            // Generate secret token
            const emailVerificationSecretToken = randomstring.generate();

            // Add emailVerificationSecretToken to the user object
            user.emailVerificationSecretToken = emailVerificationSecretToken;
            delete user.repeatPassword;
            delete user.password; 
            await new User(user).save(function (err, registeredUser) {
              if (err) {
                return res.status(500).json( 
                  {"error":
                  {
                    "type":"Registration Error",
                    "details":err
                  }
                })
              } 
              else {

                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: config.authInteract.email,
                        pass: config.authInteract.password
                    }
                });
                let mailOptions = {
                    from: `"interactTeam 👻" <${config.authInteract.email}>`,
                    to: user.email,
                    subject: 'Email confirmation!', // Subject line
                    html: ` 
                      <p>Hi, ${registeredUser.username}. Welcome to Ujanja.</p>
                      <To verify your email address click below.>
                      <a href='${req.protocol}://${req.headers.host}/home/verifyEmail/${emailVerificationSecretToken}/${registeredUser._id}'>
                      Click here to verify your email address.
                    `
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return 
                    }else{
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    //res.json({success: true, msg:'successfully registered'})
                    }
                });

                if(registeredUser){
                  user = registeredUser.toObject();
                  delete user.hashedPassword;
                  //req.user = user;
                  res.json({ user });
                  next();
                }
                return registeredUser
            }
          })

        }
    }); 
  });

},
  
  generateToken: function (user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
  },
  
  verifyEmail: async function (req, res, next) {

      const _emailVerificationSecretToken = req.body.emailVerificationSecretToken;
      const user_id = req.body.user_id
      let query = {emailVerificationSecretToken:_emailVerificationSecretToken}
      let __query = {_id:user_id}
      // Find account with matching secret token
      const user = await User.findOne(query);
        
        if(user){
          user.emailVerified = true;
          user.emailVerificationSecretToken = '';
          await user.save(function (err, verifiedEmailUser) {
            if(verifiedEmailUser){

              res.status(200).json({verifiedEmailUser})
              //res.redirect('/');
            }
            if(err){
              return err
            }
          //redirect to the login modal if the email is verified
          // maybe set up auth modal open functions and open them by passing next()
          //handle error
          });
          
        }
        if(!user){
          
          const __user = await User.findOne(__query);

          try {
            if (!user && !__user) {
              //redirect to the registration modal if the user is not found
              throw (
                {
                  "type":"Email Verification Error",
                  "details" : "User does not exist, register first."
                }
              )
            } 
          }  
          catch(err){
            return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
          }
          
          if(__user){          
            try {
              if (!user && __user.emailVerified) {
                //redirect to the registration modal if the user is not found
                throw (
                  {
                    "type":"Email Verification Message",
                    "details" : "Email already verified. Try logging in."
                  }
                )
              } 
            }  
            catch(err){
              return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
            }
          }

        }
  },

  sendPassResetToken: async function (req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          try {
            if (!user) {
              throw (
                {
                  "type":"Error",
                  "details" : "No account with that email address exists."
                }
              )
            }
          }catch(err) {
            return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
          }
  
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: config.authInteract.email,
            pass: config.authInteract.password
          }
        });
        
        var mailOptions = {
          to: user.email,
          from: `"interactTeam 👻" <${config.authInteract.email}>`,
          subject: 'Ujanja Password Reset',
          html: ` 
            <p>You are receiving this because you (or someone else) have requested a password reset for your account.</p>
            <a href='${req.protocol}://${req.headers.host}/home/resetPass/${token}'>
            Click here to to proceed with your password resetting.</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return (error);
          }else{
            res.status(200).json({emailSentTo:info.accepted[0]})
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          //res.json({success: true, msg:'successfully registered'})
          }
      });
      }
    ], function(err) {
      if (err) return next(err);
      return res.status(500).json({err})
    });
  },

  checkPassResetTokenValidityAndChangePassword: async function (req, res, next) {
    //router.post('/reset/:token', function(req, res) {
    User.findOne({ passwordResetToken: req.body.passResetToken, passwordResetExpires: { $gt: Date.now() } }, function(err, user) {
      try {
        if (!user) {
          throw (
            {
              "type":"PASSWORD RESET ERROR",
              "details" : "Password reset token is invalid or has expired. You will need to start the password reset process all over again if you want to reset your password."
            }
          )
        }
      }
      catch(err) {
        return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
      }
      if(user) {
         //Reset password post controller.
      async.waterfall([
        function(done) {
          try{
            if(req.body.newPassword === req.body.repeatNewPassword) {

                user.hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
                delete user.resetPasswordToken;
                delete user.resetPasswordExpires;
                if(err){ return(err) }
                user.save(function(err, newPasswordUser) {
                  res.status(200).json({newPasswordUser})
                  if(err){ return(err) }
                    done(err, user);
              })
            } else {
              throw({
                "type":"PASSWORD VALIDATION ERROR",
                "details" : "Passwords do not match."
              })
            }
          }catch(err){return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
        }
        },
        function(user, done) {
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: config.authInteract.email,
              pass: config.authInteract.password
            }
          });
          var mailOptions = {
            to: user.email,
            from: `"interactTeam 👻" <${config.authInteract.email}>`,
            subject: 'Your password has been changed',
            html: ` 
              <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>
              <p>You can now login with your new password.</p>`
        
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return(error);
            }else{
              res.status(200).json({password_has_been_changed_emailSentTo:info.accepted[0]})
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            }
        })
      }
      ], function(err) {
        return res.status(500).json({err})
      });
    
      }
      if(err) {
        return res.status(500).json({err})
      }
    })  
  },

  // Used when loggin in
  checkPasswordMatchAndEmailVerified:async function (req, res, next){
  
   let user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.email} ]})
   try{
     if (!user || !bcrypt.compareSync(req.body.password, user.hashedPassword)) {
       throw (
         {
           "type":"Login error.",
           "details" : "Wrong login credentials. Type in the correct username and password then try again."
         }
       )
     }
     } catch(err){
       return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
     }
  
   if (user){
     try{
       if (!user.emailVerified) {
           // Generate secret token
           const emailVerificationSecretToken = randomstring.generate();
           // Add emailVerificationSecretToken to the user object
           user.emailVerificationSecretToken = emailVerificationSecretToken;
           await new User(user).save(function (err, _user) {
             if (err) {
               return res.status(500).json( 
                 {"error":
                 {
                   "type":"Email verification token error",
                   "details":err
                 }
               })
             } 
 
               let transporter = nodemailer.createTransport({
                   host: 'smtp.gmail.com',
                   port: 465,
                   secure: true, // true for 465, false for other ports
                   auth: {
                       user: config.authInteract.email,
                       pass: config.authInteract.password
                   }
               });
               let mailOptions = {
                   from: '"interactTeam 👻" <kukungombe@gmail.com>', // sender address
                   to: user.email,
                   subject: 'Email confirmation!', // Subject line
                   html: ` 
                     <p>Hi, ${_user.username}. Welcome to GameChain.</p>
                     <To verify your email address click below.>
                     <a href='${req.protocol}://${req.headers.host}/home/verifyEmail/${emailVerificationSecretToken}/${_user._id}'>
                     Click here to verify your email address.
                   `
               };
               transporter.sendMail(mailOptions, (error, info) => {
                   if (error) {
                       return (error);
                   }else{
                   console.log('Message sent: %s', info.messageId);
                   // Preview only available when sending through an Ethereal account
                   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
           
                   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                   //res.json({success: true, msg:'successfully registered'})
                   }
               });
           })
 
         throw (
           {
             "type":"Error! Email not verified",
             "details" : `Email not verified therefore your account is not activated. An email has been sent to your email address:"${user.email}" with the email verification link. Sign in to your email address and click on the verification link to activate your account. Then you will be able to login.`
           }
         )
       }
       } catch(err){
         return res.status(500).json( {"error":{"type":err.type, "details":err.details}} )
       }
   if(user.emailVerified){next()}
  
 }
   
 }

}
