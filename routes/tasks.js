const express=require('express')
const router=express.Router()
const users =require('../model/user')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


//GET :  RETURN ALL USERS
router.get("/users", async (req, res) => {
    try {
      const data = await users.find({}).exec();
      res.status(200).json({ user: data });
    } catch (error) {
      res.status(501).send("get user failed");
    }
  });
  
  //POST :  ADD A NEW USER TO THE DATABASE
  router.post("/users",(req,res)=>{
    const {name,email,phone}= req.body
    users.create({name,email,phone},(err)=>{
        err ? res.status(401).send("add task failed"): res.status(201).send("add task succed")
    }) 
  })
  
  //PUT : EDIT A USER BY ID
  router.put("/users/:id", (req, res) => {
    users.findByIdAndUpdate(req.params.id,req.body, (err) => {
      err? res.status(502).send("update failed") : res.status(202).send("update complete");
    });
  });
  
  //  DELETE : REMOVE A USER BY ID
  router.delete("/users/:id", (req, res) => {
    users.findByIdAndRemove(req.params.id, (err) => {
      err ? res.status(502).send("delete failed") : res.status(202).send("delete complete")
    })
  })
  
  module.exports=router