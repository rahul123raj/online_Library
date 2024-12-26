const { userModel } =  require("../Model/usermodel")


const postUser = async (req,res) =>{
    try {
        
        let payload = await userModel.create({...req.body})
        res
        .status(200)
        .json({
            success: true,
            message: 'user data posted',
            payload
        })
        console.log(payload)
    } catch (error) {
        console.log('error posting user',error)
        res.status(500).json({
            success: false,
            message: 'failed to post user',
            error: error.message
        })
    }
}

const getUserbyId = async (req,res) =>{
    try {
        
        let payload = await userModel.find({email: req.params.email})
        res
        .status(200)
        .json({
            success: true,
            message: 'user data found by id',
            payload
        })
        console.log(payload)
    } catch (error) {
        console.log('error geting user',error)
        res.status(500).json({
            success: false,
            message: 'failed to get user',
            error: error.message
        })
    }
}

const getUser = async (req,res) =>{
    try {
        
        let payload = await userModel.find()
        res
        .status(200)
        .json({
            success: true,
            message: 'user data found ',
            payload
        })
        console.log(payload)
    } catch (error) {
        console.log('error geting user',error)
        res.status(500).json({
            success: false,
            message: 'failed to get user',
            error: error.message
        })
    }
}

const deleteUser = async (req,res) =>{
    try {
        
        let payload = await userModel.deleteOne({_id: req.params.id})
        res
        .status(200)
        .json({
            success: true,
            message: 'user data deleted',
            // payload
        })
        // console.log(payload)
    } catch (error) {
        console.log('error geting user',error)
        res.status(500).json({
            success: false,
            message: 'failed to delete user',
            error: error.message
        })
    }
}

module.exports = {postUser, getUserbyId, getUser, deleteUser}