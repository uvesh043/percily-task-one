import React, { useState } from "react";

import { useHistory } from "react-router";
import { Typography, TextField, Checkbox, Button } from "@material-ui/core";
import "./Css/form.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

const NewUser=(props)=>{
    // console.log(props)
    const _id=props._id;
    const count=props.count;
    const histroy=useHistory()
    const [user, setUser] = useState({
        name: "",
        email: "",
      });
    
      const [error,setError]=useState(false);
      const [errorMsg,setErrorMsg]=useState("");
    
      const handelSubmitBtn = async(e) => {
          e.preventDefault();  
        if (!user.name || !user.email) {
            setError(true);
            setErrorMsg("Please Fill all filed");
            return;
        }
    
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(user.email)){
            setError(true);
            setErrorMsg("Please provide Valid Email");
            return;
        }
        setError(false);
        setErrorMsg("");
        const response = await fetch("/updateUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
        _id:_id
            }),
          });
          const data =await response.json();
         if(response.status==201){
            setUser({ name: "",email:"" });
            toast.success("Your have update user Successfull", { position: toast.POSITION.TOP_CENTER});
         }
         else{
            toast.success("Something error ocurred ⚠️ ", { position: toast.POSITION.TOP_CENTER});
         }
        //   if(response.status==201){
        //     histroy.push("/newUser")
              
        //   }
    }
    const handelChnage = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        // console.log("Value", value, "name", name);
        setUser({ ...user, [name]: value });
      };
    return(
        <div className="form-conatiner">
      <div className="form-div">
        <div>
            <h1>Enter New Updated name and email</h1>
        </div>
          {
          error
           &&(
           <div className="errorMsg" className="errorMsg"> <Typography>{errorMsg}</Typography> </div>
           )}

       
        <div className="form-subDiv">
          <TextField 
            id="outlined-basic"
            label="Enter Your name"
            variant="outlined"
            name="name"
            autoComplete="off"
            value={user.name}
            onChange={(e) => {
              handelChnage(e);
            }}
          />
        </div>
        <div className="form-subDiv">
          <TextField
            id="outlined-basic"
            label="Enter Your Email"
            variant="outlined"
            autoComplete="off"
            name="email"
            onChange={(e) => {
              handelChnage(e);
            }}
            value={user.email}
          />
        </div>
        <div className="submitBTn">
          {/* <Button color="primary" variant="contained" onClick={handelSubmitBtn}>
            ADD
          </Button> */}
        </div>
        <div className="update-Btn">
          <Button to="/update" color="primary" variant="contained"
          onClick={handelSubmitBtn}>
              
            Update
          </Button>
        </div>
      </div>
    </div>
    )
}
export default NewUser;