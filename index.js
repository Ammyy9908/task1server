const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const auth_route = require('./router/authroutes')
const class_route = require('./router/class_routes')
const attendance_route = require('./router/attendance_route')
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://sumit:2146255sb8@cluster0.ur0yc.mongodb.net/studentdb').then(()=>{
    console.log(`Database is connected!`);
}).catch((e)=>{
    console.log(`Error while connecting to database!`,e);
})




app.use('/auth',auth_route);
app.use('/room',class_route);
app.use('/attendance',attendance_route);
const port = process.env.PORT || 5000


app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})