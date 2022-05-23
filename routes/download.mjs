import express from 'express';
var downloadRouter = express.Router();
import File from '../models/Schema.mjs';

downloadRouter.get('/:uuid', async (req,res) => {
    try{
        const file = await File.findOne({uuid:req.params.uuid});
        if(!file)
        {
            return res.render('download',{error:"Link has expired"});
        }
        const filePath=`${file.path}`;
        res.download(filePath);
    }
    catch(e)
    {
        console.log(e);
    }
})
export default downloadRouter;
