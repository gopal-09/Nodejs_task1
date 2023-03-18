const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const SchemaTypes=mongoose;
const userSchema=new Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
  }})
module.exports= mongoose.model('register',userSchema);