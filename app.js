const express =require("express");
const path=require("path");
const bodyparser=require ("body-parser");
// const fs=require('fs');



const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance')

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const contact = mongoose.model('contact', contactSchema);



const app = express();
const port=8004;

app.use('../static',express.static('static')); 
app.use(express.urlencoded());

app.set('views engine','pug');
app.set('views',path.join(__dirname,'views')); 
app.use( express.static('static'));

app.get('/',(req,res)=>{
    const pram={};
    res.status(200).render('home.pug',pram);
})
 app.get('/contact',(req,res)=>{
      const pram={};
       res.status(200).render('contact.pug',pram);
 })

app.post('/contact',(req,res)=>{
    var Mydata= new contact(req.body)
    Mydata.save().then(() => {
      res.send("this data has been saved in database")
    }).catch(()=>{
        res.status(404).send("Item is not saved in the database")
    })

    // res.status(200).render('contact.pug',pram);
})

app.listen(port,()=>{
    console.log(`The application run successfully on port ${port}`);
})
