const mongoose = require("mongoose");
const UserModel = require("./Usermodel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const checkAuth=require("./middlewares/check-auth")


exports.getAll = function (req, res, next) {
    UserModel.find()
        .exec()
        .then(experiences => {
            if (experiences.length < 1) {
                return res.status(404).json({ message: 'no users' })
            }
            else
                return res.status(200).json({ message: 'users founded', experiences });
        })
        .catch(err => {
            return res.status(500).json({ message: 'error occured', error: err })
        })
}

exports.adduser = function (req, res, next) {
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err){
            return res.status(500).json({
                error: err
            })
        }
    
        else {
               const  user = new UserModel({
                    email:req.body.email,
                    password:hash
                });
           
                user.save()
                    .then(result => {
                        if (result) {
                            return res.status(201).json({ message: 'done user Created',user })
                        }
                        else
                            return res.status(401).json({ message: 'error creation failed' });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'code error', error: err });
                    });
                }
                });
}


exports.Updateuser= async function(req,res,next){
        let user = await UserModel.findOne(req.params.id);
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if (err){
                return res.status(500).json({
                    error: err
                })
            }
        
            else {
                user.email= req.body.email;
                user.password=hash; 
         } });
                
        user.save()
                    .then(result => {
                        if (result) {
                            return res.status(201).json({ message: 'update done ',user })
                        }
                        else
                            return res.status(401).json({ message: 'error update' });
                    })
}
exports.login= function(req,res,next){
    console.log(req.body)
    UserModel.find({email:req.body.email}).
    exec().then(user =>{
        console.log(user)
        if (user.length<1){
            return res.status(404).json({
                message: "mail doesnt exist"
            })
        }
        else {
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if (err){
                    return res.status(401).json({
                        message:"auth failed",
                        error: err
                    })
                }
                if (result){
                   const token= jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id
                    }, 
                    "secret",
                    {
                        expiresIn:"2h"
                    }
                    )
                    return res.status(200).json({
                        message:"auth success",
                        token: token
                    })
                }
                res.status(401).json({
                    message:"auth failed here"

                })
            })
        }
    }
    ).catch()
}