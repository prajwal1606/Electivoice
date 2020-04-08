require("./model");
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyparser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const app = express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
const civil =require('./controllers/civil');
const course = require('./controllers/course');
app.set('views',path.join(__dirname,'/views/')); 
app.engine('handlebars',exphbs({extname:'handlebars',defaultLayout:'mainlayout',layoutsDir:__dirname+'/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine','handlebars');
app.listen("9898",()=>{
    console.log("Server started");
});

app.use("/course",course);
app.use("/civil",civil);



    
    
