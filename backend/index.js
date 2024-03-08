import express from 'express';
import {config} from 'dotenv';
import cors from 'cors' //use destructuring
import friendsRouter from './routes/friends.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
// import { addUser } from './models/database.js';
import {getFriends, getFriend, addFriend, deleteFriend, updateFriend, addUser, checkUser} from './models/database.js'
config();
const PORT = process.env.PORT

//Token creation
// jwt.verify(token, 'my_secret_key',(err, user)=>{
//     //if no access
//     if(err) return res.sendStatus(403)
//     //access
//     req.user = user
//     next()
// })

const app = express();//initialise the server
app.use(cors({
    origin:'http://localhost:8080',// frontend port
    credentials:true
})) //middlware cross origin resource sharing
app.use(express.json()) //newer version comes with body parser
app.use(cookieParser())

//creating token
// app.post('/login', (req,res)=>{
//     // const {username} = req.body
//     // const token = jwt.sign({username:username},
//     // process.env.SECRET_KEY,{expiresIn:'1h'}) //secret key is in the .env file
//     // res.cookie('jwt',token)
//     res.json({
//         msg: "You have logged in"
//     })
// })

const authenticate =(req,res,next)=>{
    let {cookie} = req.headers
    let tokenInHeader = cookie && cookie.split('=')[1]
    if(tokenInHeader===null) res.sendStatus(401)
    jwt.verify(tokenInHeader,process.env.SECRET_KEY,
(err,user)=>{
    if(err) return res.sendStatus(403)
    req.user=user
next()
})
}

// app.get('/friends',authenticate, async(req,res)=>{
    //     res.send(await getFriends())
    // })
    
    
    
app.use(express.static('views')) //when req is sent to server it will load the page and  help front end user to see the path
app.use('/friends', authenticate,friendsRouter)
// app.use(bcrypt())

app.post('/users', (req,res)=>{
    // console.log(req.body);
    const {username,password}=req.body
    bcrypt.hash(password,10,async(err,hash)=>{
        if(err) throw err
        await addUser(username,hash)
        res.send({
            msg: "You have created an account"
        })
    })
})

//next() is used in middleware
const auth= async(req,res,next)=>{
    const {password,username} = req.body //get user details
    const hashedPassword = await checkUser(username) //get password and compares it to the password entered by the user
    bcrypt.compare(password, hashedPassword, (err,result)=>{
        if (err) throw err //throws an error if the code did not run
        if(result === true){
            const {username} = req.body
            const token = jwt.sign({username:username}, //json web token do no authenticate but they allow the user access as long as they hav a token
            process.env.SECRET_KEY,{expiresIn:'1h'}) //secret key is in the .env file
            // res.cookie('jwt',token, {httpOnly:false}) //sends cookie to user 
            //httpOnly when set to true will only be accessed by the backend user only
            res.send({
                token:token, //1st token is the key name and 2nd token is the value
                msg: 'You have logged in!!! YAY!'
            })
            next()
        }else{
            res.send({msg:'The username or password is incorrect'})
        }
    })
}

//normal login router
//auth function is a middleware
app.post('/login',auth, (req,res)=>{
    //moved code to auth
    // res.send({
    //     msg: 'You have logged in!!! YAY!'
    // })
})


//loging out from backend
// app.delete('/logout',(req,res)=>{
//     res.clearCookie('jwt')
//     res.send({
//         msg:'You have logged out'
//     })
// })
app.listen( PORT,()=>{
console.log(`The local host is on http://localhost:${PORT}`)
})

