const express =require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();


app.use(
    cors()
);

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.listen(process.env.PORT, () => {
    console.log(`Fictional-Online-Store-API has started on the port http://localhost:${process.env.PORT}` );
})