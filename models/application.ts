import { InferSchemaType, Schema, model} from "mongoose";

const applicationSchema = new Schema({
    discordId: String,
    game: String,
    time: String,
    username: String,
    accepted: Boolean,
})
type Application = InferSchemaType<typeof applicationSchema>
export const applicationModel =  model<Application>("applications", applicationSchema)
