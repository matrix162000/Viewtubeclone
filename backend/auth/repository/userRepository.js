const UserModel = require('../models/userModel');
const { v4 : uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');




// 1.To add A new User in userbase

function AddUser(newUserInfo){
    return new Promise((resolve,reject)=>{
        UserModel.findOne({email:newUserInfo.email},(err,user)=>{
            if(user){
                reject("User with specified email already exist");
            }
            else if(!user){
                let newUser = new UserModel({
                    _id:uuidv4(),
                    firstName:newUserInfo.firstName,
                    lastName:newUserInfo.lastName,
                    gender:newUserInfo.gender,
                    email:newUserInfo.email,
                    password:bcrypt.hashSync(newUserInfo.password,10),
                    secretQuestion:newUserInfo.secretQuestion
                });

                newUser.save((err)=>{
                    if(!err){
                        resolve('New User added successfully');
                    }
                    else{
                        reject(err);
                    }
                })
            }
            else{
                reject(err);
            }
        })
       

       
    })

}

//2.To get the profile of particular user

function GetUser(id){
    return new Promise((resolve,reject)=>{
        UserModel.find({_id:id},(err,user)=>{
            if(!err){
                resolve(user);
            }
            else{
                reject("User Not Fount");
            }
        })
    })
}




//3.chnage password

function PasswordChange(id,updateInfo){
   return new Promise((resolve,reject)=>{
    UserModel.findOne({_id:id},(err,user)=>{
        if(!err){
            if(bcrypt.compareSync(updateInfo.oldPassword,user.password)){
                UserModel.findOneAndUpdate({_id:id},{password:bcrypt.hashSync(updateInfo.newPassword,10)},(err,data)=>{
                    resolve("Your Password Change Successfully");
                })
            }
            else{
                reject("Check Your Current Password")
            }
        }
        else{
            reject(err);
        }
       
    })
   })
}


// to update the information of user

function UpdateUserInfo(id,EditedInfo){
   return new Promise((resolve,reject)=>{
     UserModel.findOne({_id:id},(err,user)=>{
        if(!err){
            UserModel.findOneAndUpdate({_id:id},{firstName:EditedInfo.firstName,lastName:EditedInfo.lastName},(err,data)=>{
                if(!err){
                    resolve("Information Updated Successfully");
                }
                else{
                    reject(err);
                }
            })
        }
        else{
            reject('User not fount');
        }
     })
   })
}

// to delete a user from userbase

function DeleteUser(userInfo){
return new Promise((resolve,reject)=>{
    UserModel.findOne({email:userInfo.email},(err,user)=>{
        if(!user){
           resolve("user does not exist")
        }
        else if(user){
            UserModel.deleteOne({email:userInfo.email},(err,data)=>{
                if(!err){
                    resolve("User Deleted Successfully");
                }
               
            })
        }
        else{
            reject(err);
        }
    })
   
})
}

function ForgetPassword(userCredential){
    console.log(userCredential.email)
    console.log(userCredential.secretQuestion)
    console.log(userCredential.newPassword);
   return new Promise((resolve, reject) => {
      UserModel.findOne({email:userCredential.email},(err,user)=>{
        if(user&&!err){
            UserModel.findOneAndUpdate({email:userCredential.email, secretQuestion:userCredential.secretQuestion},{password:bcrypt.hashSync(userCredential.newPassword,10)},(err,data)=>{      
                   if(!err&&data){
                    resolve("Password reset successfully")
                   }
                   else{
                    reject("Wrong Answer Or Email");
                   }
                   
            })
        }
        else{
            reject("Wrong Answer Or Email");
        }
      })
   })
}

module.exports = {GetUser,AddUser,DeleteUser,UpdateUserInfo,PasswordChange,ForgetPassword};