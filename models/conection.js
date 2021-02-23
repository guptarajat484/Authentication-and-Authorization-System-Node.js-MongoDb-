const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/register", {useNewUrlParser: true,useUnifiedTopology:true})
.then(result=>{
    console.log("Database Connected")
}).catch(err=>{
    console.error("Connection Error");
})

module.exports = mongoose;