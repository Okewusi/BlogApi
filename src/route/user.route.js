import express from 'express';
const route = express.Router();
import {addUser, findUser, userlogin} from "../controller/user.controller";
import {verifyToken} from "../middleware/auth";

route.post('/login',userlogin);
route.post('/register',addUser);
route.get('/user', findUser);

export default route;

// export const getUser = async(req,res)=>{
//     if(!req.params.id){
//         res.status(400).json({error: "enter a user id"})
//     }
//     try {
//         let {id} = req.params;
//         const result = await User.find({ _id: id });
//         if(!result.length){
//             res.status(400).json({error: "user not found"}) 
//             return
//         }
//         res.status(200).json({result}); 
//     } catch (error) {
//         res.status(400).json({error})
//     }
   
// }