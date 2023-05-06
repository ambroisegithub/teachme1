import mongoose from "mongoose"
import  dotenv  from "dotenv"
dotenv.config()
import app from "./app.js"
mongoose.set("strictQuery",false);
mongoose.connect(process.env.DATABASENAME)
.then(()=> {
    console.log("DB CONNECTED!");
})
.catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT || 7777;
app.listen(PORT || 7777,()=>{
    console.log(`The server is running on port ${PORT}`);
})

app.get('/', (req, res)=>{
    res.status(200).json({
        message:"hello welcome to teach me",
        status: "OK",
    
    })
})

export default app;
