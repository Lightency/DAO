const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3000;
app.use(cors());
app.use(express.json())


// Route to get a deposit
app.get("/api/getFromId/:user_address", (req,res)=>{

const userAddress = req.params.user_address;
 db.query("SELECT deposit FROM user WHERE user_address = ?", userAddress, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route to get users

app.get("/api/get/:user_address", (req,res)=>{
    const userAddress = req.params.user_address;
    db.query("SELECT user_address FROM user WHERE user_address = ? ", userAddress, (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

// Route for creating a new deposit
app.post('/api/create', (req,res)=> {

const useraddress = req.body.userAddress;
const deposit = req.body.deposit;

db.query("INSERT INTO user (user_address, deposit) VALUES (?,?)",[useraddress, deposit], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route to add a deposit
app.post('/api/add_deposit/:user_address',(req,res)=>{

const userAddress = req.params.user_address;
const deposit= req.body.deposit;
db.query("UPDATE user SET deposit = deposit + ? WHERE user_address = ?", [deposit, userAddress], (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to sub a deposit

app.post('/api/sub_deposit/:user_address',(req,res)=>{

    const userAddress = req.params.user_address;
    const deposit= req.body.deposit;
    db.query("UPDATE user SET deposit = deposit - ? WHERE user_address = ?",[deposit,userAddress], (err,result)=>{
        if(err) {
       console.log(err)   } 
       console.log(result)
        });    
    });




app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})