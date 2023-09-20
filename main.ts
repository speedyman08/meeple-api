import express, {Request, Response} from "express";
import mongoose from "mongoose";
import { userModel } from "./user";
mongoose.connect('mongodb://localhost/database').then(()=>{
    console.log("DB connected")
})

const app = express();

app.use(express.json());

app.use((err: any, req: Request, res: Response, next: any) => {
    if (err.type === 'entity.parse.failed') {
        res.status(400).send({ success: false, message: 'Bad JSON format' });
    } else {
        next(err);
    }
});

app.post('/createuser',(req:Request,res:Response )=>{
if (req.body.name && req.body.age) {
    const user = new userModel({name: req.body.name, age: req.body.age})
    user.save();
    res
    .send({success: true})
    .end()
} else {
    res
    .status(400)
    .send({success: false, message:"Missing name or age"})
    .end();
}
})

app.get('/users', async (req:Request, res:Response) => {
    const users = await userModel.find({})
    await res.status(200).send(users).end();
})

app.get('/user', async (req:Request,res:Response)=>{
    if (req.body.name) {
        const user = await userModel.findOne({name:req.body.name})
        if (!user){
            await res.status(404).send({success:false, message:"Could not find user"});
            return;
        }
        await res.status(200).send(user).end();
    } else {
        await res.status(400).send({success:false, message:"Bad syntax, are you missing name?"}).end();
    }
})

app.delete('/deleteuser', async(req:Request, res:Response)=>{
    if(req.body.name) {
    const user = await userModel.findOneAndDelete({name:req.body.name})
    if (!user){
        await res.status(404).send({success:false,message:"User not found"})
        return;
    }

    await res.status(200).send({success: true, message:"User deleted"})
    } else {
        await res.status(400).send({success:false, message:"Bad syntax, are you missing name?"}).end();
    }
})

app.listen(3001, ()=>{
    console.log("Listening on 3001")
})