const express = require('express');
const app = express();



//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})