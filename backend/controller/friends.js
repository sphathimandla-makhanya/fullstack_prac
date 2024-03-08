import {getFriends, getFriend, addFriend, deleteFriend, updateFriend, addUser} from '../models/database.js'

export default{
    getMany: async (req,res)=>{
        res.send(await getFriends())
    },
    postMany: async (req,res)=>{
        const {name,age} = req.body
        const post = await addFriend(name,age)
        res.send(await getFriends())
    },
    getSingle: async(req,res)=>{
        res.send(await getFriend(+req.params.id))
    },
    deleteSingle: async (req,res)=>{
        await deleteFriend(req.params.name)
        res.json(await getFriends())
    },
    updatedb: async(req,res)=>{
        const [friend] = await getFriend(+req.params.name)
        let {name,age} = req.body 
        name ? name=name : {name}=friend
        age ? age=age: {age}=friend
        console.log(friend)
        const edit = await updateFriend(name,age,+req.params.name)
        res.json(await getFriends())
    },
//     newUser: async(req,res)=>{
//         const {username,password}=req.body
//         bcrypt.hash(password,10,async(err,hash)=>{
//             if(err) throw err
//             await addUser(username,hash)
//             res.send({
//                 msg: "You have created an account"
//             })
// })
// }
}
