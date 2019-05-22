const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();
module.exports = router;

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/home');
     }
}

router.post('/register', asyncHandler(register) );
router.post('/login',checkPasswordMatchAndEmailVerified, passport.authenticate('local', { session: true }), login);
router.get('/me', ensureAuthenticated, login);
router.get('/logout', logout);
router.post('/verifyEmail', (req, res, next)=>{
  authCtrl.verifyEmail(req, res, next);
});
router.post('/sendPassResetToken', (req, res, next)=>{
  authCtrl.sendPassResetToken(req, res, next);
});
router.post('/checkPassResetTokenValidityAndChangePassword', (req, res, next)=>{
  authCtrl.checkPassResetTokenValidityAndChangePassword(req, res, next);
});


async function register(req, res, next) {
  authCtrl.register(req, res, next);
}
async function checkPasswordMatchAndEmailVerified(req, res, next) {
  authCtrl.checkPasswordMatchAndEmailVerified(req, res, next);
}


function login(req, res) {
  let user = req.user;
  res.json({ user });
}

function logout(req, res){
  //req.session.destroy(function(err) {})
  req.logout();
  res.redirect('/');
};

/* Add capture, 2FA, EmailVerification */