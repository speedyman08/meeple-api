import { InferSchemaType, model } from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema({
    transactionId: String,
    senderId: Number,
    receiverId: Number,
    time: Number,
    moneySent: Number,
})

type Transaction = InferSchemaType<typeof transactionSchema>

export const transactionModel = model<Transaction>("transactions", transactionSchema)
