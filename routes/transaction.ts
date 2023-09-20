import {Request, Response, Router} from "express";
import {transactionModel} from "../models/transaction";
import {v4} from 'uuid'

export const transactionRoutes = Router();

transactionRoutes.post('/createtransaction', (req:Request,res:Response)=>{
    if(req.body.senderId && req.body.receiverId && req.body.moneySent) {
        const time = Date.now()
        const transactionId = v4();
        const transaction = new transactionModel({
            transactionId: transactionId,
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            time: time,
            moneySent: req.body.moneySent
        })
        transaction.save();
        res.status(200).send({success:true, message:"Transaction saved to database."})

    } else {
        res.status(400).send({success:false, message:"Missing senderId, recieverId or moneySent"})
    }
})

transactionRoutes.get('/transactions',async (req:Request,res:Response)=>{
    const transactions = await transactionModel.find({})
    res.status(200).send(transactions)
})
transactionRoutes.get('/transactions/:senderId', async(req:Request,res:Response)=>{
    if(req.params.senderId) {
        const userTransactions = await transactionModel.find({senderId:req.params.senderId})
        res.status(200).send(userTransactions)
    } else {
        res.status(400).send({success:false,message:"Missing senderId"})
    }
})