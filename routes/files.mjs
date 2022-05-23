import express from "express";
var fileRouter = express.Router();
import multer from "multer";
import File from "../models/Schema.mjs";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

let storage=multer.diskStorage({
    destination:(req,file,callback) =>callback(null,process.cwd()+"/Uploads"),
    filename:(req,file,cb) =>{
        const uniqueName =`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
})


let upload=multer({
    storage,
    limits: {fileSize: 1000000 *100} //100 mb conveted to bytes
}).single('myfile'); 


fileRouter.post('/', (req,res) => {
    
    //store file
    upload(req,res, async (err) => {
    //validate request
    console.log(req.file)
    if(!req.file)
    {
        return res.json({error: 'All fields are required'})
    }
        if(err)
        {
            return res.status(500).send({error: err.message})
        }
        

        //store in database

        
        const file = new File({
            filename: req.file.filename ,
            uuid:uuidv4(),
            path:req.file.path,
            size:req.file.size,
        })

        //Response -> Link
        const response = await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})

    })

})


    fileRouter.post('/send', async (req,res) =>{
        const {uuid,sender,receiver}= req.body;
        //validate request
        if(!uuid || !sender || !receiver)
            return res.status(422).send({error:"All fields are required"});
        const file = File.findOne({uuid:uuid});
        if(file.sender)
            return res.status(422).send({error: "Email already sent"});
        file.sender= sender;
        file.receiver=receiver;
        const response = await file.save();
    })


export default fileRouter;