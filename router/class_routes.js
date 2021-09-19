const router = require('express').Router()
const Room = require('../models/ClassRoom');

router.get('/all/:teacher_id',async (req,res)=>{
    const {teacher_id} = req.params;


    const rooms = await Room.find({create_by:teacher_id});
    
    res.status(200).send(rooms);
})
.get('/all/student/:student_id',async (req,res)=>{
    const {student_id} = req.params;
    

    Room.find().then((rooms)=>{
        
        return rooms.filter((room)=>room.joined_by.includes(student_id));
    }).then((rooms)=>{
        return res.status(200).send(rooms)
    })
})
.get('/:class_id',async (req,res)=>{
    const {class_id} =req.params;


    const room = await Room.findOne({_id:class_id});

    res.status(200).send(room);
})
.post('/create',async (req,res)=>{
    const {name,subject} = req.body;
    const {teacher_id} = req.headers;

    new Room({
        name,
        subject,
        create_by:teacher_id,
        code:(Math.floor(100000 + Math.random() * 900000)).toString()
    }).save().then((newRoom)=>{
        res.status(200).send({room:newRoom});
    })
})
.put('/join',async (req,res)=>{
    const {student_id} = req.headers;
    const {code} = req.body;
    const room = await Room.findOne({code:code});
    const joined_by = room.joined_by;

    if(joined_by.includes(student_id)){
        return res.status(200).send({error:"Already in this class Try with another class code!"})
    }

    joined_by.push(student_id)
    if(!room){
        return res.status(200).send({error:"Invalid Class Code Ask your teacher!"})
    }
    Room.updateOne({code:code},{joined_by:joined_by}).then(()=>{
        res.status(200).send({message:"Class Joined Successfully",room})
    }).catch((e)=>{
        console.log(e)
    })

    
})
.put('/remove/:student_id/:roomid',async (req,res)=>{
    const {roomid} = req.params;
    const {student_id} = req.params;
    const joined_by = await Room.findOne({_id:roomid});

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }
    
    const newStudents = removeItemOnce(joined_by.joined_by,student_id)

    Room.updateOne({_id:roomid},{joined_by:newStudents}).then(()=>{
        res.status(200).send({error:false,message:"Student Removed Successfully"})
    })
})


module.exports = router;