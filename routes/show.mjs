import express from "express";
var router2 = express.Router();
import File from '../models/Schema.mjs';

router2.get('/:uuid',async (req,res)=>{
    try{
        const file= await File.findOne({uuid: req.params["uuid"]});
        if(!file)
        { 
            return res.render('download',{error:"Link has expired"});
        }
        return res.render('download',{
            uuid:file.uuid,
            fileName: file.filename ,
            fileSize:file.size,
            download:`${process.env.APP_BASE_URL}/files/download${file.uuid}`
        });
    }
    catch(e)
    {
        console.log(e);
    }
})
export default router2;