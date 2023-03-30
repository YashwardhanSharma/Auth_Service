const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
       try {
        const user = await this.userRepository.create(data);
        return user;
       } catch (error) {
        console.log("Somthing went wrong in the service layer");
        throw error;
       }
    }

    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordsMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordsMatch){
                console.log("Password doesn't match");
                throw {error:'Incorrect password'};
            }

            const newJwt = this.createToken({email:user.email,id:user.id});
            return newJwt;

        } catch (error) {
            console.log("Somthing went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const res = this.verifyToken(token);
            if(!res){
                throw {error:'Invalid token'}
            }
            const user = await this.userRepository.getById(res.id);
            if(!user){
                throw {error:'No user with thecorresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Somthing went wrong in the auth process");
            throw error;
        }
    }

    createToken(user){
     try {
        const result = jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
        return result;
     } catch (error) {
        console.log("Somthing went wrong in token creation");
        throw error;
     }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Somthing went wrong in validation",error);
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Somthing went wrong in password comparison");
            throw error;
        }
    }
}

module.exports=UserService;