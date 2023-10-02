import { Router, Request, Response } from "express";
import { applicationModel } from "../models/application";

export const applicationRoutes = Router();

applicationRoutes.post('/application', async (req:Request,res:Response)=>{
    if (req.body.discordId && req.body.game && req.body.username) {
        const time = Date.now()
        const application = new applicationModel({
            discordId: req.body.discordId,
            game: req.body.game,
            time: time,
            username: req.body.username,
            accepted: false
        })
        await application.save()
        res.send({success:true, message:"Application saved"})
    } else {
        res.status(400).send({success:false, message: "Missing discordId, game, time or username"})
    }
    
})
applicationRoutes.get('/application/:game/:discordId', async (req:Request,res:Response)=>{
    if (req.params.discordId && req.params.game) {
        const application = await applicationModel.findOne({discordId:req.params.discordId, game:req.params.game, accepted: false})
        if (!application) {
            res.status(400).send({success:false, message: "Could not find application"})
            return
        }
        res.send(application)
    } else {
        res.status(400).send({success:false, message: "Missing discordId"})
    }
})
applicationRoutes.get('/application/:game/:discordId/exists', async (req:Request,res:Response)=>{
    if (req.params.discordId && req.params.game) {
        const application = await applicationModel.findOne({discordId:req.params.discordId, game:req.params.game})
        if (!application) {
            res.status(404).send({exists:false})
            return
        }
        res.send({exists:true})
    } else {
        res.status(400).send({success:false, message: "Missing discordId"})
    }
})
applicationRoutes.get('/application/:game/:discordId/accept', async (req:Request,res:Response)=>{
    if (req.params.discordId && req.params.game) {
        const application = await applicationModel.findOneAndUpdate({discordId:req.params.discordId, game: req.params.game}, {accepted: true})
        if (!application) {
            res.status(400).send({success:false, message: "Could not find application"})
            return
        }
        res.send({success:true, message: "User accepted"})
    } else {
        res.status(400).send({success:false, message: "Missing discordId"})
    }
})
applicationRoutes.get('/application/:game', async (req:Request,res:Response)=>{
    if (req.params.game) {
    const applications = await applicationModel.find({accepted: false, game:req.params.game})
    res.send(applications)
    } else {
        res.status(400).send("Missing game")
    }
    
})
applicationRoutes.put('/application/:game/:discordId/username', async (req:Request,res:Response)=>{
    if (req.params.discordId && req.params.game && req.body.username) {
        const application = await applicationModel.findOneAndUpdate({discordId:req.params.discordId, game: req.params.game}, {username:req.body.username, accepted:false})
        if (!application) {
            res.status(400).send({success:false, message: "Could not find application"})
            return
        }
        res.send({success:true, message: "Username changed"})
    } else {
        res.status(400).send({success:false, message: "Missing discordId"})
    }
})