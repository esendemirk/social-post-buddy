const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const captionSchema = new mongoose.Schema({
    caption:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Caption', captionSchema,'captions');