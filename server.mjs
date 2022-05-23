import express from 'express';
import connectDB from './config/db.mjs';
import fileRouter  from './routes/files.mjs';
import showRouter  from './routes/show.mjs';
import downloadRouter from './routes/download.mjs'
import path from 'path';
connectDB();

const app = express();
app.use(express.json());


//Template engine
app.set('views', path.join(process.cwd(),"/views"));
app.set('view engine', 'ejs');




//Routing
app.get('/', (req, res) => {
    res.render('index')
})
app.use('/api/files', fileRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`App is running on port : ${PORT}`);
})