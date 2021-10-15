const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//specify where to find the schema
const Caption = require('./models/caption')
//connect and display the status 
mongoose.connect('mongodb://localhost:27017/SPB', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });
//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the captions API 
//by adding /captions, we tell the server that this method will be called every time http://localhost:8000/captions is requested. 
app.get('/captions', (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
    Caption.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
    });

});

//serve incoming post requests to /captions
app.post('/captions', (req, res, next) => {
    // create a new student variable and save requestâs fields 
    const caption = new Caption({
        caption: req.body.caption
    });
    //send the document to the database 
    caption.save()
        //in case of success
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/captions/:id", (req, res, next) => {
    Caption.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
app.put('/captions/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Caption.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                caption : req.body.caption 
            }}, 
            {new:true} 
        ) 
        .then((caption) => { 
            if (caption) { //what was updated 
                console.log(caption); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//find a student based on the id
app.get('/captions/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.captions.findOne())
    Caption.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});



//to use this middleware in other parts of the application
module.exports=app;