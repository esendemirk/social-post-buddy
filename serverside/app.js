const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//specify where to find the schema
const Caption = require('./models/caption');
const Hashtag = require('./models/hashtag');
const Location = require('./models/location');
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

//CaptionsComponent
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

//HashtagsComponent
    //in the app.get() method below we add a path for the hashtags API 
    //by adding /hashtags, we tell the server that this method will be called every time http://localhost:8000/hashtags is requested. 
    app.get('/hashtags', (req, res, next) => {
        //call mongoose method find (MongoDB db.Students.find())
        Hashtag.find() 
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
        });

    });

    //serve incoming post requests to /captions
    app.post('/hashtags', (req, res, next) => {
        // create a new student variable and save requestâs fields 
        const hashtag = new Hashtag({
            hashtag: req.body.hashtag
        });
        //send the document to the database 
        hashtag.save()
            //in case of success
            .then(() => { console.log('Success');})
            //if error
            .catch(err => {console.log('Error:' + err);});
    });

    //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/hashtags/:id", (req, res, next) => {
        Hashtag.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("Deleted!");
        });
    });

    //serve incoming put requests to /hashtags 
    app.put('/hashtags/:id', (req, res, next) => { 
        console.log("id: " + req.params.id) 
        // check that the parameter id is valid 
        if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
            //find a document and set new first and last names 
            Hashtag.findOneAndUpdate( 
                {_id: req.params.id}, 
                {$set:{ 
                    hashtag : req.body.hashtag 
                }}, 
                {new:true} 
            ) 
            .then((hashtag) => { 
                if (hashtag) { //what was updated 
                    console.log(hashtag); 
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

    //find a hashtag based on the id
    app.get('/hashtags/:id', (req, res, next) => {
        //call mongoose method findOne (MongoDB db.captions.findOne())
        Hashtag.findOne({_id: req.params.id}) 
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

//LocationsComponent
    //in the app.get() method below we add a path for the locations API 
    //by adding /locations, we tell the server that this method will be called every time http://localhost:8000/locations is requested. 
    app.get('/locations', (req, res, next) => {
        //call mongoose method find (MongoDB db.Students.find())
        Location.find() 
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
        });

    });

    //serve incoming post requests to /captions
    app.post('/locations', (req, res, next) => {
        // create a new student variable and save requestâs fields 
        const location = new Location({
            location: req.body.location
        });
        //send the document to the database 
        location.save()
            //in case of success
            .then(() => { console.log('Success');})
            //if error
            .catch(err => {console.log('Error:' + err);});
    });

    //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/locations/:id", (req, res, next) => {
        Location.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("Deleted!");
        });
    });

    //serve incoming put requests to /hashtags 
    app.put('/locations/:id', (req, res, next) => { 
        console.log("id: " + req.params.id) 
        // check that the parameter id is valid 
        if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
            //find a document and set new first and last names 
            Location.findOneAndUpdate( 
                {_id: req.params.id}, 
                {$set:{ 
                    location : req.body.location 
                }}, 
                {new:true} 
            ) 
            .then((location) => { 
                if (location) { //what was updated 
                    console.log(location); 
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

    //find a location based on the id
    app.get('/locations/:id', (req, res, next) => {
        //call mongoose method findOne (MongoDB db.captions.findOne())
        Location.findOne({_id: req.params.id}) 
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