import express from 'express';
import connectDB from './config/db.mjs';
import Router from './routes/files.mjs';
const app = express();


app.use('api/files', Router)


connectDB();
const PORT= process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`)
})