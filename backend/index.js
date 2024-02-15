import express from 'express';
import {config} from 'dotenv';
import cors from 'cors' //use destructuring
import friendsRouter from './routes/friends.js'
config();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
// import { addUser } from './models/database.js';
import {getFriends, getFriend, addFriend, deleteFriend, updateFriend, addUser, checkUser} from './models/database.js'
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
app.use(cors()) //middlware cross origin resource sharing
app.use(express.json()) //newer version comes with body parser
app.use(cookieParser())

//exmpl creating token
app.post('/login', (req,res)=>{
    const {username} = req.body
    const token = jwt.sign({username:username},
    process.env.SECRET_KEY,{expiresIn:'1h'})
    res.cookie('jwt',token)
    res.json({
        msg: "You have logged in"
    })
})



app.use(express.static('views')) //when req is sent to server it will load the page and  help front end user to see the path
app.use('/friends',friendsRouter)
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

//next is used in middleware
const auth= async(req,res,next)=>{
    const {password,username} = req.body
    const hashedPassword = await checkUser(username)
    bcrypt.compare(password, hashedPassword, (err,result)=>{
        if (err) throw err
        if(result === true){
            next()
        }else{
            res.send({msg:'The username or password is incorrect'})
        }
    })
}

app.post('/login',auth, (req,res)=>{
    res.send({
        msg: 'You have logged in!!! YAY!'
    })
})


app.listen( PORT,()=>{
console.log(`The local host is on http://localhost:${PORT}`)
})

