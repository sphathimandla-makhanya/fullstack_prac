// import {pool} from '../config/config'
import mysql from 'mysql2'
import {config} from 'dotenv'
config()


const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()

const getFriends = async()=>{
    const [result] = await pool.query(`
        SELECT *
        FROM mates
    `)
    return result
}

const getFriend =async(id)=>{
    const [result] = await pool.query(`
        SELECT * 
        FROM mates
        WHERE id = ?
    `,[id])
    return result
}

const addFriend = async(name,age)=>{
    const [friend] = await pool.query(`
        INSERT INTO mates (name,age) VALUES (?,?)
    `,[name,age])
    return getFriend(friend.insertId)
}
// console.log(await getFriends())

const deleteFriend = async(name)=>{
    const [friend] = await pool.query(`
    DELETE FROM mates where name =?
    `,[name])
    return getFriends()
}

const updateFriend = async (name,age,id)=>{
    const [friend] = await pool.query(`
    UPDATE mates set name= ?, age=? 
    WHERE (id=?)
    `,[name,age,id])
    return friend
}

//dealing with passwords and usernames
//checking if data exists
const addUser = async(username, password)=>{
    const [user] = await pool.query(`INSERT INTO users (username, password)
    VALUES (?,?)`, [username, password])
}
//console.log(await deleteFriend('fgh'));

const checkUser =async(username)=>{
    const [[{password}]] = await pool.query(`
    SELECT password FROM users WHERE username = ?
    `, [username])
    return password
}
// console.log(await checkUser('Raja'));

export {getFriends, getFriend, addFriend, deleteFriend, updateFriend, addUser, checkUser}