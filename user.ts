import mongoose, { InferSchemaType, model } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    age: Number
})

type User = InferSchemaType<typeof userSchema>

export const userModel =  model<User>("users", userSchema)
