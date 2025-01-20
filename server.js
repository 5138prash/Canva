const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

dotenv.config();
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({

      credentials: true,
    })
  );
}



const PORT = process.env.PORT;



if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "./frontend/dist")))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'./', 'frontend', 'dist', 'index.html'))
  })
}

const dbConnect = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose.connect(process.env.LOCAL_URI).then(() => {
        console.log("Connected to MongoDB Compass....");
      });
    } else {
      await mongoose.connect(process.env.URI)
      .then(() => {
        console.log("Connected to MongoDB Atlas...");
      });
    }
  } catch (error) {
    console.log("Database Connection Failed") 
  }
}; 

dbConnect();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
