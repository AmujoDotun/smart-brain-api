const express = require('express');
const bodyPaser =require('body-parser');

const app = express();

app.use(bodyPaser.json());

const database ={
    users: [
        {
            id: "123",
            name: "dotun",
            email: "dotun@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "samuel",
            email: "samuel@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ]
}

 app.get("/", (req, res)=>{
     res.send(database.users);
 })

    app.post("/signin", (req, res)=>{
        if(req.body.email === database.users[0].email &&
            req.body.password === database.users[0].password){
                res.json("successful");
            }else{
                res.status(400).json('user input is incorrect');
            }
})

app.post("/register", (req, res)=>{
    const {email, password, name } = req.body;
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})


app.get("/profile/:id", (req, res)=>{
    const { id }= req.params;
    let found = false;
    database.users.forEach(user=>{
       if(user.id === id){
        found = true;
        return res.json(user);
       }
    })
    if(!found){
        res.status(400).json("no such user is found");
    }
})

app.put("/image", (req, res)=>{
    const { id }= req.body;
    let found = false;
    database.users.forEach(user=>{
       if(user.id === id){
        found = true;
        user.entries++
        return res.json(user.entries);
       }
    })
    if(!found){
        res.status(400).json("no such user is found");
    }
})


app.listen(3000);