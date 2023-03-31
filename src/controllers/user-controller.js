const UserService = require('../services/user-service');

const userService=new UserService();

const create = async (req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            message:'Successfully created a new user',
            success:true,
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Somthing went wrong',
            data:{},
            success:false,
            err:error
        });
    }

}
const signIn = async (req,res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:'Sucessfully signin in '
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Somthing went wrong',
            data:{},
            success:false,
            err:error
        });
    }
}

const isAuthenticated = async (req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const ress = await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err:{},
            data:ress,
            message:'user is authenticated and token valid'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Somthing went wrong',
            data:{},
            success:false,
            err:error
        });
    }
}

const isAdmin = async(req,res)=>{
    try {
       const response = await userService.isAdmin(req.body.id);
       return res.status(200).json({
        data:response,
        err:{},
        success:true,
        message:'Successfully fetchedw whether user is admin or not'
       })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Somthing went wrong',
            data:{},
            success:false,
            err:error
        });
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin
}