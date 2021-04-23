import express from 'express';
import mongoose from "mongoose";
import {dbUrl} from "./src/config/config";
import userRoute from "./src/route/user.route";
import postRoute from "./src/route/post.route";
import commentRoute from "./src/route/comment.route";

const blog = express();
const PORT = process.env.PORT || 5000;


// connect database , note the dbURL was set in the config.js and .env files

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "database connection error:"));
db.once('open', ()=>{
    console.log(`database connected to ${dbUrl}`)
})


blog.use(express.json());



// defining the root routes
blog.use('/api', userRoute);
blog.use('/api', postRoute);
blog.use('/api', commentRoute);

blog.get('/', (req,res)=>{
    res.status(200).send('<html><body><h1>Welcome</h1></body></html>')
})

blog.get('*',(req,res)=>{
    res.status(400).json({error: "route not found"})
})

blog.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})