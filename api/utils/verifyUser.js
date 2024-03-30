import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken = (req , res , next) => {
    const token = req.cookies.access_token; // pehla km hamne is me kiya k token liya cookies se cookie-parser package install kar k 
    // is k liye hmy "cookie-parser" package install karna paray ga
    if(!token) return next(errorHandler(401 , 'You are not authenticated!')) // dosra hmne kiya k token ha to thek ha ni too retrun krdoo error 401 ka login need

    jwt.verify(token , process.env.JWT_SECRET , (err , user) => { //3rd km token verify karwana ha us me bi aghar error ajye to return krdo 403 token is not valid
        if(err) return next(errorHandler(403 , 'Token is not valid'))
        // return res.status(403).json('Token is not valid')
            // Aghar error nhi ha to req.user = user krdoo or next flow pass krdo
        req.user = user;
        next()
    });
}