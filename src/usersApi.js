const exp=require("express")
const userApp=exp.Router()
const ExpressAsyncHandler=require('express-async-handler')
const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")
userApp.use(exp.json())
userApp.get('/get-user/:username',ExpressAsyncHandler(async (request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    let usernameOfUrl=request.params.username
    let userOfDB=await userCollectionObj.findOne({username:usernameOfUrl})
    if(userOfDB===null){
        response.status(200).send({message:"User Not found"})
    }
    else{
        delete userOfDB.password
        response.status(201).send({message:"Found user",payload:userOfDB})
    }
}))
userApp.post('/user-signup',ExpressAsyncHandler(async (request,response)=>{
    const userCollectionObj=request.app.get("userCollectionObj")
    const newUser=request.body;
    console.log(newUser)
    let userOfDB=await userCollectionObj.findOne({email:newUser.email})
    if(userOfDB!=null){
        response.status(200).send({message:"User already exists"})
    }
    else{
        let hashedpassword=await bcryptjs.hash(newUser.password,5)
        newUser.password=hashedpassword
        await userCollectionObj.insertOne(newUser)
        response.status(201).send({message:"User created"})
    }
}))

/*userApp.post('/user-login',ExpressAsyncHandler(async (request,response)=>{
   const userCollectionObj=request.app.get("userCollectionObj")
    const userCredObj=request.body;
    let userOfDB=await userCollectionObj.findOne({username:userCredObj.username})
    
    if(userOfDB===null){
        response.status(200).send({message:"Invalid username"})
    }
    else{
        let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)
        if(isEqual===false){
            response.send({message:"Invalid password"})
        }
        else{
            let jwtToken=jwt.sign({username:userOfDB.username},'abcdef',{expiresIn:30})
            response.send({message:"success",token:jwtToken})
        }    
    }
}))*/
userApp.post('/user-login', ExpressAsyncHandler(async (request, response) => {
    const userCollectionObj = request.app.get("userCollectionObj");
    const userCredObj = request.body;

    // Find the user by email
    const userOfDB = await userCollectionObj.findOne({ email: userCredObj.email });

    if (userOfDB === null) {
        response.status(200).send({ message: "Invalid email" });
    } else {
        // Compare the provided password with the hashed password from the database
        const isPasswordValid = await bcryptjs.compare(userCredObj.password, userOfDB.password);

        if (isPasswordValid) {
            // Password is valid; generate and send a JWT token
            const jwtToken = jwt.sign({ email: userOfDB.email }, 'your-secret-key', { expiresIn: '1h' });
            response.status(200).send({ message: "Success", token: jwtToken });
        } else {
            // Password is invalid
            response.status(200).send({ message: "Invalid password" });
        }
    }
}));

module.exports=userApp;