const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
        // define the function here & it would be called when a new data entry is there in the list.
    },
});

// module.exports is like providing API from a database, allowing to fetch functions (data in case of API). 
// Importing the function exported thru module.exports allows us to use those function
const User = mongoose.model('user', UserSchema) 
User.createIndexes();
module.exports = User
// name of model and schema used (inside the model)

// Model: querying and manipulating documents in a collection
// Schema: It is just like defining the columns of table and types of data we r going to store in each column