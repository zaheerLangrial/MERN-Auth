import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req , res) => {
    res.json({
        message : 'Api is working'
    })
}


// Update User 




export const updateUser = async (req, res, next) => {
    try {
        // Check if the user ID exists
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Check if the authenticated user is authorized to update
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, 'You can update only your account'));
        }

        // Update user fields
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Perform the update operation
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true },
        );

        // Log the updated user
        console.log('Updated user:', updatedUser);

        // Send response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        // Handle any errors
        console.error('Update user error:', error);
        next(error);
    }
};



// export const updateUser = async (req , res , next) => {
//     console.log(req.body)
//     if(req.user.id !== req.params.id) {
//         // return res.status(401).json('You can update only your account');
//         return next(errorHandler(401 , 'You can update only your account'))
//     }
//     try {
//         if(req.body.password) {
//             req.body.password = bcryptjs.hashSync(req.body.password , 10)
//         }
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id, 
//             {
//                 $set : {
//                     username : req.body.username,
//                     email : req.body.email,
//                     password : req.body.password,
//                     profilePicture : req.body.profilePicture,
//                 }
//             },
//             {new : true},
//         )
//      // Log the updated user
//         if (!updatedUser) {
//             // If updatedUser is null, handle the error accordingly
//             return next(errorHandler(404, 'User not found'));
//         }
//         const { password, ...rest } = updatedUser._doc;
//         res.status(200).json(rest);
//     } catch (error) {
//         next(error)
//     }
// }