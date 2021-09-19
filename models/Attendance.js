const {model,Schema} = require('mongoose');


const attendance_schema = new Schema({
    class_id:{
        type:"String",
        required:true
    },
    student_id:{
        type:"String",
        required:true
    },
    is_attend:{
        type:"Boolean",
        required:true
    },
    date:{
        type:"String",
        required:true
    }
    
});



module.exports = model('attendance',attendance_schema);