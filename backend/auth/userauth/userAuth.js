const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const e = require('express');
const SECRET_KEY = "my secret key for authentication"

function PassportAuth(){
    return new LocalStrategy({ usernameField: 'email', passwordField: "password" },
    function (email, password, done) {
        UserModel.findOne({ email:email }, function (err, user) {
            if (err) { 
                return done(err);
             }
            if (!user) { return done(null, false, { message: "Incorrect Email" }); }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false,{ message: "Incorrect Password" });
            }
            return done(null,user);
        });
    });
}


function GenerateToken(user){
   const token= jwt.sign(user,SECRET_KEY);
   return  {
    token ,user
   }
}

function VarifyToken(token){
    let res = jwt.verify(token,SECRET_KEY,(err,decode)=> decode!==undefined?decode:err);
   // console.log(token);
   // console.log(res);
    if(res instanceof Error){
        return false;
    }
    else{
        return res;
    }
}




module.exports = {PassportAuth , GenerateToken,VarifyToken}