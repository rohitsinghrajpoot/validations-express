const express = require("express")

const { body, validationResult } = require('express-validator')

const User = require("../models/user.model")

const router = express.Router()

router.post("/", 
 body("first_name").trim().not().isEmpty().withMessage("first name is required"),
 body("last_name").not().isEmpty().withMessage("last name is required"),
 body("email").not().isEmpty().withMessage("email is required").
 custom(async (value)=>{
    const user = await User.findOne({email:value})
    if(user){
        throw new Error("email is already taken")
    }
    return true
 }),
 body("pincode").not().isEmpty().isLength({min: 6}).withMessage("pincode should be exactly 6 numbers"),
 body("age").not().isEmpty().custom((val)=>{
      if(val<1 || val>100){
          throw new Error("age should less than 100 and more than 1")
      }
      return true
 }),
 body("gender").not().isEmpty().custom((val)=>{
     if(val !=="Male"||"Female"||"Other"){
         throw new Error("either Male , Female or others")
     }
     return true
 }),
async (req,res)=>{
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
         const user = await User.create(req.body) 
         return res.status(201).send(user)
    } catch(err){
        return res.status(500).send({msg : err.msg})
    }
})

module.exports = router 