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

/**
 * Setup the mongodb connection 
 */


 mongoose.connect(process.env.DB_URL)
    .then( ()=> console.log("MongoDB connected "))
    .catch( (err)=> console.log( err ));
    

const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');


app.use(  homeRoutes );
app.use( '/api' , authRoutes );
app.use( '/api' , cartRoutes );
app.use( '/api' , productRoutes );
app.use( '/api' , orderRoutes );


app.listen(process.env.PORT, () => {
    console.log(`Fictional-Online-Store-API has started on the port http://localhost:${process.env.PORT}` );
})