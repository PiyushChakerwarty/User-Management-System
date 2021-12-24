const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan')
const bodyparser = require("body-parser");
const path = require('path');
const route=require('./server/routes/router')

const connectDB=require('./server/database/connection')

const app = express()

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 5001

//log request
app.use(morgan('tiny'));

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//set view engine
app.set("view engine", "ejs")
// to ste path for ejs files
app.set("views",path.resolve(__dirname,"views"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/',require('./server/routes/router.js'))

app.listen(PORT, () => {
    console.log((`Server listening to port http://localhost:${PORT}`));
})