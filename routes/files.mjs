import express from "express";
var router = express.Router();
import multer from "multer";
import File from "../models/Schema.mjs";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import os from "os"

let storage=multer.diskStorage({
    destination:(req,file,callback) =>callback(null,process.cwd()+"/Uploads"),
    filename:(req,file,callback) =>{
        const uniqueName =`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        callback(null,uniqueName);
    }
})


let upload=multer({
    storage,
    limits: {fileSize: 1000000 *100} //100 mb conveted to bytes
}).single('myfile'); 


router.post('/', (req,res) => {
    
    //store file
    upload(req,res, async (err) => {
    //validate request
    if(!req.file)
    {
        console.log(req.body)
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
        console.log
        return res.redirect(`${process.env.APP_BASE_URL}/files/${response.uuid}`)

    })

})

export default router;
