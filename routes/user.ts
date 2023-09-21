import {Request, Response, Router} from "express";
import {userModel} from "../models/user";

export const userRoutes = Router();

userRoutes.post('/createuser',(req:Request,res:Response )=> {
    if (req.body.username && req.body.discordId) {
        const user = new userModel({username: req.body.username, discordId: req.body.discordId, balance: 500, lastWorkTime: 0})
        user.save();
        res.send({success: true, message: "User created"}).end()
    } else {
        res.status(400).send({success: false, message:"Missing values, are you sure you have username and discordId?"}).end();
    }
})

userRoutes.get('/users', async (req:Request, res:Response) => {
    const users = await userModel.find({})
    res.status(200).send(users).end();
})

userRoutes.get('/user/:discordId', async (req:Request,res:Response)=>{
    if (req.params.discordId) {
        const user = await userModel.findOne({discordId: req.params.discordId})
        if (!user){
            res.status(404).send({success:false, message:"Could not find user"});
            return;
        }
        res.status(200).send(user).end();
    } else {
        res.status(400).send({success:false, message:"Bad syntax"}).end();
    }
})

userRoutes.put('/user/:discordId/balance', async(req:Request,res:Response)=>{
    if (req.params.discordId && typeof req.body.balance !== 'undefined'){
        const user = await userModel.findOneAndUpdate({discordId: req.params.discordId}, {balance: req.body.balance})
        if (!user){
            res.status(404).send({success:false, message:"Could not find discordId"});
            return;
        }
        res.status(200).send({success:true, message:"Balance updated"})
    } else {
        res.status(400).send({success:false, message:"Missing balance or discordId"}).end();
    }
})

userRoutes.get('/user/:discordId/balance', async(req:Request, res:Response) => {
    if (req.params.discordId) {
        const user = await userModel.findOne({discordId: req.params.discordId})
        if (!user) {
            res.status(404).send({success:false, message:"Could not find discordId"}).end();
            return;
        }
        res.status(200).send({balance: user.balance}).end();
    }
})

userRoutes.delete('/deleteuser/:discordId', async(req:Request, res:Response)=>{
    if(req.params.discordId) {
        const user = await userModel.findOneAndDelete({discordId: req.params.discordId})
        if (!user){
            res.status(404).send({success:false,message:"User not found"})
            return;
        }

        res.status(200).send({success: true, message:"User deleted"})
    } else {
        res.status(400).send({success:false, message:"Bad syntax"}).end();
    }
})
userRoutes.put('/user/:discordId/job', async(req:Request,res:Response)=>{
    if(req.params.discordId && req.body.lastWorkTime) {
        const user = await userModel.findOneAndUpdate({discordId: req.params.discordId}, {lastWorkTime:req.body.lastWorkTime})
        if (!user){
            res.status(404).send({success:false,message:"User not found"})
            return;
        }
        res.status(200).send({success:true,message:"Last work time saved"})
    } else{
        res.status(400).send({success:false,message:"Missing discordId or lastWorkTime"})
    }
    
})
userRoutes.get('/user/:discordId/job', async(req:Request,res:Response)=>{
    if(req.params.discordId) {
        const user = await userModel.findOne({discordId: req.params.discordId})
        if (!user){
            res.status(404).send({success:false,message:"User not found"})
            return;
        }
        res.status(200).send({lastWorkTime: user.lastWorkTime}).end();
    } else{
        res.status(400).send({success:false,message:"Missing discordId"})
    }
    
})