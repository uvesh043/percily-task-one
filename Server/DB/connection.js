const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost/precily-AI",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{console.log('Connection  Succesfully with database')}).catch(()=>{
    console.log("Not connected with database");
})