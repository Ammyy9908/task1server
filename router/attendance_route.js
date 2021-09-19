const router = require('express').Router()
const Attendance = require('../models/Attendance');

router.get('/get/:sid/:cid',async (req,res)=>{
    const attendance = await Attendance.find({student_id:req.params.sid,class_id:req.params.cid});
    return res.status(200).send(attendance);
})
.get('/read/:cid',async (req,res)=>{

    const attendance = await Attendance.find({class_id:req.params.cid});
    return res.status(200).send(attendance)
})
.post('/create/:cid/:sid',async (req,res)=>{
    const {date} = req.body;
    new Attendance({
        class_id:req.params.cid,
        student_id:req.params.sid,
        is_attend:true,
        date,
    }).save().then(()=>{
        res.status(200).send({is_attend:true});
    })
})

module.exports = router;