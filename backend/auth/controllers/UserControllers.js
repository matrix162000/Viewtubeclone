
const { verify } = require('jsonwebtoken');
const {GetUser,AddUser, DeleteUser,UpdateUserInfo,PasswordChange,ForgetPassword} = require('../repository/userRepository');
const {GenerateToken,VarifyToken} = require('../userauth/userAuth')


//Get Profile of a particular user

function GetProfile(req,res){
    
    const data = VarifyToken(req.headers.authorization);
    GetUser(data.user).then(user=>{
        res.status(200).send(user);
    }).catch(data=>{
        res.status(404).send('User not found');
    })
}

//register a user

function RegisterUser(req,res){
   AddUser(req.body).then(data=>{
     res.status(200).send(data);
   }).catch(data=>{
    res.status(404).send(data)
   })

}

// login authenticate user
function LoginUser(req,res){
    const token =   GenerateToken(req.session.passport);
    // const data=VarifyToken(req.headers.authorization);
    res.cookie("jwt", token.token, { httpOnly: false ,maxAge: 600000 })
    // console.log(req.headers);
    console.log(token);
    // id=data.user;
    // console.log(token.user.user);
    res.status(200).send({
        msg:"login Successfully",
        userid: token.user.user,
        state:true,
    })
    

}





function ChangePassword(req,res){
   const data = VarifyToken(req.headers.authorization);
   PasswordChange(data.user,req.body).then(data=>{
    res.status(200).send(data);
   }).catch(data=>{
    res.status(404).send(data);
   })
  
  
    
 }

// to unregister a user from userbase
function UnregisterUser(req,res){
    DeleteUser(req.body).then( user=>{
        res.status(200).send(user);
    });
}

// to update User info

function UpdateProfile(req,res){
    const data = VarifyToken(req.headers.authorization);
    UpdateUserInfo(data.user,req.body).then(data=>{
        res.status(200).send(data);
    }).catch(data=>{
        res.status(404).send(data);
    })

}

function ResetPassword(req,res){
    ForgetPassword(req.body).then(data=>{
        res.status(200).send(data);
    }).catch(data=>{
        res.status(404).send(data);
    })
}


  



module.exports = {GetProfile, RegisterUser,LoginUser , UnregisterUser,UpdateProfile,ChangePassword,ResetPassword};