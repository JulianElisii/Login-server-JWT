import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/JWT", {

}) 
 .then(db => console.log("data base is connect"))
 .catch(err => console.log(err))









//mongodb://127.0.0.1:27017/