import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req , res) => {
    res.json({
        message : 'Api is working'
    })
}


// Update User 


export const updateUser = async (req , res , next) => {
    if(req.user.id !== req.params.id) {
        // return res.status(401).json('You can update only your account');
        return next(errorHandler(401 , 'You can update only your account'))
    }
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set : {
                    username : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    profilePicture : req.body.profilePicture,
                }
            },
            {new : true},
        )
     // Log the updated user
        if (!updatedUser) {
            // If updatedUser is null, handle the error accordingly
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}