import express from 'express';
import mongoose from "mongoose";
import router from "./router.js"

const port = 5000;
const DB_URL = `mongodb://admin:mongo721887@192.168.0.62/phones?authSource=admin`
const app = express();

app.use(express.json());
app.use('/api', router)

async function startapp(){
    try{
        await mongoose.connect(DB_URL)
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}
startapp()