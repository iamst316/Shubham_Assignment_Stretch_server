const express = require('express') ;
const mongoose = require("mongoose");
const app = express() ;
require('dotenv').config()
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["https://cheery-blini-93a516.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  })
);

app.use(  (req,res)=>{
  res.header('Access-Control-Allow-Origin', 'https://delightful-capybara-79d84c.netlify.app');
}
)
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
