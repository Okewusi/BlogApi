import tokenjwt from 'jsonwebtoken';
import { secret } from '../config/config';

export const tokenGenerator = async(emailAddress)=>{
    try {
        const token = await tokenjwt.sign(emailAddress, secret);
        return token;
    } catch (error) {
        throw new Error(error)
    }
}

export const verifyToken = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        res.status(403).json({error: "Unathorized"});
        return
    }
    await tokenjwt.verify(token, secret, (err, result)=>{
        if(err){
            res.status(403).json({error: err});
            return;
        }
        req.user = result;
        next();
    })
    
}