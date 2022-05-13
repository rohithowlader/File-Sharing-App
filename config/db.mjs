import 'dotenv/config';
import mongoose from "mongoose";

const connectDB = () => {
    //mongoose.connect(process.env.MONGO_CONNECTION_URL);
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
    //mongoose.connect(`mongodb+srv://$admin:$admin@cluster0.atzqb.mongodb.net/fileshare?retryWrites=true&w=majority`)
    const db = mongoose.connection;
    try{
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}
catch(e)
{
    console.log(e);
}
}

export default connectDB;
