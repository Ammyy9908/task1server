const {model,Schema} = require('mongoose')


const student_schema = new Schema({
    avatar:{
        type:"String",
        required:false,
        default:null,
    },
    name:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    account_type:{
        type:"String",
        default:"student"
    }
})


const Student = model('student',student_schema)
module.exports = Student