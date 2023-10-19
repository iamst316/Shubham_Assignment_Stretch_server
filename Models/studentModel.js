const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    },
    name: {
        type:String,
        required: [true, "Name is required"],
    },
    bio: {
        type:String,
        required: [true, "Bio is required"]
    },
    gravatar: {
        type:String,
        required: [true, "Avatar is required"]
    },
    location: {
        type:String,
        required: [true, "Location is required"]
    },
    
    fieldOfInterest: [],
    
    seeking: [],

    techStack: [],

    githubURL: {
        type:String,
        required: [true, "Github URL is required"],
        unique:true,
    },

    twitterURL: {
        type:String,
        required: [true, "TwitterURL is required"],
        unique:true,
    },

    websiteURL: {
        type:String,
        required: [true, "Website URL is required"],
        unique:true,
    },

    linkedinURL: {
        type:String,
        required: [true, "LinkedIn URL is required"],
        unique:true,
    },
});

studentSchema.pre("save", async function() {
    this.password = bcrypt.hash(this.password, 12);
});


module.exports = mongoose.model("Student", studentSchema);