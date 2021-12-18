const express=require('express')
const app=express();

require('./DB/connection');
const User = require("./Model/userSchema");
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Home Page");
});
app.post("/add", async (req, res) => {
    const {name,email}=req.body;
    console.log(name,email)
    try {
      const newUser = await new User({
        name: name,
        email: email
      });
      await newUser.save();
      return res.status(201).json({ msg: "New User added to database"  });
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/update", async (req, res) => {
    const {name,email}=req.body;
    console.log("nameemail",name,email);
        try {
        const existUser = await User.findOne({ email: email}).exec();
console.log("this is name",name,"existUser",existUser);
if(existUser===null){
    return res.status(401).json({ msg: "No user found"  }); 
}
        if(!(name ==existUser.name)){
            return res.status(401).json({ msg: "invalid credentials"  }); 
        }
        return res.status(201).json({ existUser: existUser  }); 
    } catch (error) {
      console.log(error);
    }
  });
  app.post('/updateUser',async (req,res)=>{
      const {name,email,_id}=req.body
      
      
      console.log("updateUser req body",name,email,_id)
      try {
          
        const existUser = await User.findByIdAndUpdate(_id,{ name:name,email: email },function(err,docs){
            if(err){
                return res.status(401).json({ msg: "invalid credentials"  });
            }
            else{
               return res.status(201).json({docs:docs});
            }

        });
         
    
      } catch (error) {
          
      }
  })
app.listen(3001,()=>{
    console.log(`Listening to port 3000`)
})
