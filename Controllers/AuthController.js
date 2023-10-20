const studentModel = require("../Models/studentModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, bio, gravatar, location, fieldOfInterest, seeking, techStack, githubURL, twitterURL, websiteURL, linkedinURL } = req.body.regForm;

    const existingUser = await studentModel.findOne({ email });

    if (existingUser) {
      return res.json({ message: "Student already exists" });
    }

    const user = await studentModel.create({ email, password, name, bio, gravatar, location, fieldOfInterest, seeking, techStack, githubURL, twitterURL, websiteURL, linkedinURL });

    const token = createSecretToken(user._id);

    // console.log("USER-->", user);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 30 * 1000,
    });
    res
      .status(201)
      .json({ message: "Student signed up successfully", success: true, user });
      
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body.loginForm;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await studentModel.findOne({ email });

    // console.log(user);

    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }

    const auth = bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }

    const token = createSecretToken(user._id);
    // console.log("to be logged-->",user);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 30 * 1000,
    });
    res.status(201).json({ message: "User logged in successfully", success: true, user: user });
    next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.getStudents = async (req, res, next) => {
  try {
    const list = await studentModel.find();
    res
      .status(201)
      .send(list);
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.search = async (req, res, next) => {
  try {
    const { query } = req.body;

    const techSearch = await studentModel.find({ techStack: {$in: [query]} });
    const nameSearch = await studentModel.find({ name: query });
    const bioSearch = await studentModel.find({ bio: query });

    const list = [...techSearch,...nameSearch,...bioSearch];

    res
      .status(201)
      .send(list);
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Edit = async (req, res, next) => {
  try {
    const { _id, email, password, name, bio, gravatar, location, fieldOfInterest, seeking, techStack, githubURL, twitterURL, websiteURL, linkedinURL } = req.body.editForm;

    const validProps = {};

    if(email){
      validProps.email = email;
    }
    if(password){
      validProps.password = password;
    }
    if(name){
      validProps.name = name;
    }
    if(bio){
      validProps.bio = bio;
    }
    if(gravatar){
      validProps.gravatar = gravatar;
    }
    if(location){
      validProps.location = location;
    }
    if(fieldOfInterest){
      validProps.fieldOfInterest = fieldOfInterest;
    }
    if(seeking){
      validProps.seeking = seeking;
    }
    if(techStack){
      validProps.techStack = techStack;
    }
    if(githubURL){
      validProps.githubURL = githubURL;
    }
    if(twitterURL){
      validProps.twitterURL = twitterURL;
    }
    if(websiteURL){
      validProps.websiteURL = websiteURL;
    }
    if(linkedinURL){
      validProps.linkedinURL = linkedinURL;
    }
    
    await studentModel.findOneAndUpdate({ _id: _id }, { $set: validProps });

    const newOne = await studentModel.findOne({_id});

    console.log("updated",newOne);

    return res.status(200).json({ message: "Student updated successfully", success: true, user: newOne});
    
  } catch (error) {
    console.error(error);
  }
};

module.exports.Delete = async (req, res, next) => {
  try {
    // console.log(req);

    const { email } = req.params;

    await studentModel.deleteOne({ email });

    res
      .status(201)
      .json({ message: "User Deleted successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};