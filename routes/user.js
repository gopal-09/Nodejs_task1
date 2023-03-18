const express=require('express')
const {signup,login,forgotpass}= require('../controllers/userc')
const router =express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/forgotpass',forgotpass)

module.exports=router