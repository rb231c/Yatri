import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
    Credentials: true
}

// database connection
mongoose.set("strictQuery", false);

const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log("Error connecting to MongoDB");


        
    }
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); 


app.listen(port, ()=>{
    connect()
    console.log('server listening on port', port);
})