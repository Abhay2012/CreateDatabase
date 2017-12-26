const Express = require('express');
const mongodb = require('mongodb');

var app = Express();
var new_db = "mongodb://localhost:27017/try";


app.get('/result/:id', (req, res) => {
    console.log(req.params.id);
    

    mongodb.connect( new_db, (error, db)=>{
        if(error) throw error;    
        console.log("Connected");
        db.collection('result1').find({info : "02420703114&#10;ABHAY SEHGAL  SID: 190000080880&#10;SchemeID: 190312014001"}).toArray( (err , collection) => {
            if(err) throw err;
            console.log("Record Read successfully");
            console.log(collection);
            db.close();
        });
    })
    
    res.send(req.params.id);
})

app.listen(3000, ()=> {
    console.log("Server Listening At 3000");
})