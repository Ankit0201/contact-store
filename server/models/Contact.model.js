const mongoose = require("mongoose");


const ContactSchema = new mongoose.Schema({

    "firstName": {type:String, required:true},
    "lastName": {type:String, required:true},
    "phoneNumber": {type:String, required:true}
},{
    timestamps:true
})

const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel