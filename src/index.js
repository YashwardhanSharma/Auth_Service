const express=require('express');
const bodyParser=require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

//const UserService = require('./services/user-service');



const app = express();

const prepareAndStartServer = () =>{

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',apiRoutes);

app.listen(PORT,async ()=>{
    console.log(`Server Started on Port : ${PORT}`);
   
    // const service = new UserService();
    // const newToken =  service.createToken({email:'yash@gmail.com',id:1});
    // console.log("New token is",newToken);
    //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inlhc2hAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY4MDAyMzg0MywiZXhwIjoxNjgwMDIzODczfQ.j9r_yQ_YcS0Fs4NEziKjgYy0htQHZWaduvcmbyhNO3A';
    //  const response = service.verifyToken(token);
    //  console.log(response);
});
}

prepareAndStartServer();