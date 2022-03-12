const express = require("express");
const connectDB = require("./config/connectDB");
const users= require("./model/user");
var cors = require('cors');
const app = express();
app.use(cors({origin:'*'})); 
connectDB();
app.use(express.json());
app.use('/api',require("./routes/tasks"));

// app.post('/api/use',(req,res)=>{
//   const {name,email,phone} = req.body
//   users.create({name,email,phone},(err)=>{
//       err ? res.status(401).send("add task failed"): res.status(201).send("add task succed")
//   })
// })
const port = process.env.Port || 5000;
app.listen(port, (err) =>{
  err ? console.log(err) : console.log(`the server is running on ${port}`)
});

