import express from 'express';
import connectDB from './config/db.mjs';
import router  from './routes/files.mjs';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/files', router)


connectDB();
const PORT= process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`)
})