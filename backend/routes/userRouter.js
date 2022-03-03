const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth=require('../middleware/auth')


router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.get('/infor',auth, userCtrl.getUserInfor)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/logout', userCtrl.logout)

router.patch('/update',auth, userCtrl.updateUser)

//Social login
router.post('/google_login', userCtrl.googleLogin)

router.post('/google_signup', userCtrl.googleSignup)

router.post('/facebook_login', userCtrl.facebookLogin)

router.post('/facebook_signup', userCtrl.facebookSignup)

module.exports = router