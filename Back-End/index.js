require('dotenv').config();
const bcrypt = require("bcrypt");
const BodyParser = require("body-parser");
const cors = require('cors');
const data = require("./db.json");
const express = require('express');
const uuid = require('uuid');
const session = require("express-session");


const app = express();
const Port = 3500;

app.use(express.json())
app.use(session({secret: "SecretKeyword"}));



const users =[];

const options = {
    origin: 'http://localhost:3000',
    credentials:true
}

console.log(process.env.FOO);

app.use(cors(options));

app.get('/users', (req,res) => {
    res.json(users)
})

app.post("/REGISTER", async (req,res) => {

    //prevent duplicate users
    const user = users.find(user => user.user == req.body.user)
    if(user != null){
        return res.sendStatus(401);
    }

    //Encrypts Passwords
    try{
        const hashedPassword = await bcrypt.hash(req.body.pwd, 10)
        const user = { user:req.body.user, pwd:hashedPassword}
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send();
    }

})

app.post("/auth", async(req,res) => {

    //Searches username
    const user = users.find(user => user.user == req.body.user)
    if(user == null){
        return res.sendStatus(401)
    }

    //compares password with entered result
    try{
        if(await bcrypt.compare(req.body.pwd, user.pwd)){
            res.sendStatus(200);
        }else{
            res.sendStatus(401);
        }
    }catch{
        res.status(500).send()
    }
})

app.listen(Port,() => console.log("SERVER HOSTED ON "+ Port))