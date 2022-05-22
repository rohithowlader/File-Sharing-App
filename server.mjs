import express from 'express';
import connectDB from './config/db.mjs';
import router  from './routes/files.mjs';
import router2  from './routes/show.mjs';
import path from 'path';
connectDB();

const app = express();
app.use(express.json());


//Template engine
app.set('views', path.join(process.cwd(),"/views"));
app.set('view engine', 'ejs');




//Routing
app.use('/api/files', router);
app.use('/files',router2);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`);
})