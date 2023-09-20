import { InferSchemaType, model } from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema({
    transactionId: String,
    senderId: String,
    receiverId: String,
    time: Number,
    moneySent: String,
})

type Transaction = InferSchemaType<typeof transactionSchema>

export const transactionModel = model<Transaction>("transactions", transactionSchema)
