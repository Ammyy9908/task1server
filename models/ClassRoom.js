const {model,Schema} = require('mongoose');


const room_schema = new Schema({
    name:{
        type:"String",
        required:true
    },
    subject:{
        type:"String",
        required:true
    },
    create_by:{
        type:"String",
        required:true
    },
    joined_by:{
        type:"Object",
        default:[]
    },
    code:{
        type:"String",
        required:true
    }
});



module.exports = model('room',room_schema);