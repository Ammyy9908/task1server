const router = require('express').Router()
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyUser = async (req,res,next)=>{

    const token = req.headers.authorization;

    try{
        const isValid = await jwt.verify(token,'mytopsecret');
        if(!isValid){
            return res.status(401).send({error:"Invalid Token!"});
        }
        else{
            req.user = isValid;
            next();
        }
    }
    catch(e){
        res.status(500).send({error:"Error while verifying your identity"})
    }
}

router.get('/user',verifyUser,async (req,res)=>{
    const {user} = req;

    const {account_type} = user;

    if(account_type==="teacher"){
        const teacher = await Teacher.findOne({_id:user.id});
        res.status(200).send({name:teacher.name,email:teacher.email,account_type:teacher.account_type,avatar:teacher.avatar,id:teacher._id})
    }
    else{
        const student = await Student.findOne({_id:user.id});
        res.status(200).send({name:student.name,email:student.email,account_type:student.account_type,avatar:student.avatar,id:student._id})
    }

    
})
.get('/teacher/:id',async (req,res)=>{
    const teacher = await Teacher.findOne({_id:req.params.id});

    res.status(200).send({name:teacher.name})
})
.
get('/student/:id',async (req,res)=>{
    const student = await Student.findOne({_id:req.params.id});

    res.status(200).send(student)
})
.post('/register/teacher',async (req,res)=>{
    const {email,name,password} = req.body;

    //first check is there is someone registered with same email

    const teacher = await Teacher.findOne({email:email});

    if(teacher){
        return res.status(401).send({error:"There is a teacher account registered with this email!"});
    }


    //hash the password
    const hash =bcrypt.hashSync(password, 10);

    new Teacher({
        name,
        email,
        password:hash
    }).save().then(()=>{
        res.status(200).send({error:null,messsage:"Registration successfully done!"});
    })
})
.post('/register/student',async (req,res)=>{
    const {email,name,password} = req.body;

    const student = await Student.findOne({email:email});

    if(student){
        return res.status(401).send({error:"There is another student account registered with this email!"});
    }


    //hash the password
    const hash =bcrypt.hashSync(password, 10);

    new Student({
        name,
        email,
        password:hash
    }).save().then(()=>{
        res.status(200).send({error:null,messsage:"Registration successfully done!"});
    })
})
.post('/login/teacher',async (req,res)=>{
    const {email,password} = req.body;

    // find a teacher with email

    const teacher = await Teacher.findOne({email});

    if(!teacher){
        return res.status(401).send({error:"Teacher not found with this email"});
    }

    // compare password

    const isValid = await bcrypt.compareSync(password,teacher.password);

    if(!isValid){
        return res.status(401).send({error:"Invalid Credientials!"});
    }

    // else make a jwt token

    const token = await jwt.sign({id:teacher._id,account_type:teacher.account_type},"mytopsecret");

    res.status(200).send({token});
}).
post('/login/student',async (req,res)=>{
    const {email,password} = req.body;

    // find a teacher with email

    const student = await Student.findOne({email});

    if(!student){
        return res.status(401).send({error:"Student not found with this email"});
    }

    // compare password

    const isValid = await bcrypt.compareSync(password,student.password);

    if(!isValid){
        return res.status(401).send({error:"Invalid Credientials!"});
    }

    // else make a jwt token

    const token = await jwt.sign({id:student._id,account_type:student.account_type},"mytopsecret");

    res.status(200).send({token});
})



module.exports = router;