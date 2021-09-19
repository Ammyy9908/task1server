const {model,Schema} = require('mongoose')


const teacher_schema = new Schema({
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
    }
    ,
    account_type:{
        type:"String",
        default:"teacher"
    }
})


const Teacher = model('teacher',teacher_schema)
module.exports = Teacher