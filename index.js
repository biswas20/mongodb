const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const password ="HelloMongoDb20";
const uri = "mongodb+srv://antor:HelloMongoDb20@cluster0.dlhvl.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  app.post('/addProducts',(req,res) => {
    const product =req.body;
    console.log(product);
    collection.insertOne(product)
    .then(result =>{
      console.log("One Product Added");
      res.send("Successfully Product added!");
      console.log(result.insertedCount);
    })
    
  })
});
app.listen(4000,()=>console.log("4000 Port Is Connect"))
