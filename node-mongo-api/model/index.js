const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Electives",{ useNewUrlParser: true ,useUnifiedTopology: true},(error)=>{
if(!error)
{
    console.log("Success Connected");
}
else{
    console.log("Error connecting to database."+ error);
}
});

 require("./course.model");
 require("./civil.model");

