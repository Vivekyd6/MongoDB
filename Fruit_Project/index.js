const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection url
const url = 'mongodb://localhost:27017';

// Database name 
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server.
 client.connect(function(err){
     assert.equal(null,err);
     console.log("Connectecd successfully to server");

     const db = client.db(dbName);
     insertDocuments(db,function(){
        client.close();
     });
 }); 

 const insertDocuments = function(db,callback){
     const collection = db.collection('fruits');
     collection.insertMany([
        {
           name:"Apple",
           score: 8,
           review:"Great Fruit"
        },
        {
            name:"Mango",
            score: 9,
            review:"Awesome Fruit"
        },
        {
            name:"Orange",
            score: 7,
            review:"Nice Fruit"
        }
        ],function(err,result){
           assert.equal(err,null);
           assert.equal(3,result.result.n);  
           assert.equal(3,result.ops.length);
          console.log("Inserted 3 documents into the collection");
         callback(result);
         });
 }