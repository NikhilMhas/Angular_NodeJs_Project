require("dotenv").config();
const express=require("express");
const app=express();
const authRouter = require('./routes/authRoute');
const projectRouter = require('./routes/projectRoute');
const cors = require('cors');
app.use(cors());
app.get("/",(req,res)=>{
  res.status(200).json({
    status:'success',
    message:"Rest API is working",
  });
});

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects/',projectRouter);

app.use("*",(req,res,next)=>{
    res.status(404).json({
        status:"fail",
        message:"Route Not Found",
    });
})

const PORT=process.env.APP_PORT;
app.listen(PORT,()=>{
    console.log("server is running at",PORT);
})