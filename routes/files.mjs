import express from "express";
var router = express.Router();
import multer from "multer";

let storage=multer.diskStorage({
    destination:(req,file,callback) =>callback(null,'uploads/'),
    filename:(req,file,callback) =>{
        const uniqueName =`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        callback(null,uniqueName);
    }
})


let upload=multer({
    storage,
    limits: {fileSize: 1000000 *100} //100 mb conveted to bytes
}).single();


router.post('/', (req,res) => {
    //validate request
    if(!req.file)
    {
        return res.json({error: 'All fields are required'})
    }

    //store file
    upload(req,res,(err) => {
        if(err)
        {
            return res.status(500).send({error: err.message})
        }

        
        //store in database



    })


    



    //Response -> Link
})


export default router;