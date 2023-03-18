const { response } = require('express')
const User=require('../models/userm')
const bcrypt =  require('bcryptjs')
const JWT = require("jsonwebtoken")
const { check, validationResult } = require("express-validator");
 signup= async (req,res,next) => {
    const{name,email,password}=req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    res.send("validation error: " + errors)
    else{
     let existingUser;
     try {
         existingUser = await User.findOne({name}) 
         }
         catch (error) {
             console.log(error);
         } 
         if(existingUser) {
            //console.log(existingUser)
              res.json({message:'user exist'})  
         }
         else{
         const hashedPassword= await bcrypt.hashSync(password)
         const user=new User({
                name,
                email,
                password:hashedPassword,
                
         }) ;
         
         try {
             await user.save();
             res.send(user)
         }
         catch (error) {
             console.log(error);
         }
         
        }
    }
}
login= async (req, res) => {
    const{email,password}=req.body;
        let user;
        try {
            user = await User.findOne({email})
        }
        catch (error) {
            console.log(error);
        }
        if(!user) {
           return res.json({message: "User not found"})
        }
        else{
        const isPasswordCorrect=bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
        {
                return res.status(200).json({message:"Incorrect password"})
        }
        else{
            return res.send('sign in success')
        }
    }
}
const forgotpass= async(req,res)=>{
        const email=req.body.email
        var existingUser;
        try{
            existingUser = await User.findOne({email})
        } catch(err){
            console.log(err)
        }
        if(!existingUser){
            res.send('Email not found')
        }
        else{
            const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
            const link=`http://localhost:5000/resetpass/${token}`
            console.log(link)
            res.json({
                link: link,
                msg:"use above link to reset password"
            })
        } 
    }
    


module.exports ={signup,login,forgotpass}
