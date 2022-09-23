const express = require('express');
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const mainRoutes = require("./routes/main");


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });


//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Logging
app.use(logger("dev"));

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})