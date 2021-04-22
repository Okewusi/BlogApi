import Users from '../model/user.model';
import bcrypt from 'bcrypt';
import {tokenGenerator, verifyToken} from "../middleware/auth"



export const addUser = async(req, res)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400).json("INVALID credentials");
        return;
    }
    const {name, email,password,age} = req.body;
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const UserAlreadyExist = await Users.find({email});
    if(UserAlreadyExist.length){
        res.status(400).json({error: "email already exists"});
        return;
    }
    const newUser = await new Users({name, email, password:hash, age});
    await newUser.save((err, newUser) =>{
        if(err){
            res.status(400).json({err}); return
        }
        res.status(200).json({newUser})
    })
}

export const findUser = async (req,res)=>{
    if(!req.body.email){
        res.status(400).json({error: "enter your email"}); 
        return
    }
    const emailAddress = req.body.email;
    try {
        // const user = await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
        const user = await Users.find({email : emailAddress });
        if(!user.length){
        res.status(400).json({error: "user does not exist"});
        return;
    }
        res.status(200).json({user})
    }catch (error) {
        res.status(400).json({error})
    }
}

export const userlogin = async (req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).json({error: "enter username and password"});
        return;
    }
    const emailAddress = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const user = await Users.find({email: emailAddress});
    if(!user.length){
        res.status(400).json({error: "user not found"}); return;
    }
    const passwordCheck = await bcrypt.compare(password, user[0].password);
    if(!passwordCheck){
        res.status(400).json({error: "wrong password"}); return;
    }
    const token = await tokenGenerator(emailAddress);
    res.status(200).json({message: "login succesful", token});
}

