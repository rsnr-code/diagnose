const express = require('express');
const app = express();

const mainRoutes = require("./routes/main");


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));


//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})