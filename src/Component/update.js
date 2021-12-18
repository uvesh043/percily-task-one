import React, { useState } from "react";
import "./Css/form.css";
import "./Css/update.css";
import { Typography, TextField, Checkbox, Button } from "@material-ui/core";
import {Link } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
toast.configure();
const Update = (props) => {
    const history=useHistory();
    const setId=props.setId;
    const count=props.count;
    const setCount=props.setCount;
    const checkCount=props.checkCount;
    const setcheckCount=props.setcheckCount;
    // console.log(setId)
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const handelUpdateBtn = async (e) => {
    setCount(preCount=>preCount+1)    
    console.log(count)
    if (!user.name || !user.email) {
      setError(true);
      setErrorMsg("Please Fill all filed");
      return;
    }
   
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(user.email)) {
      setError(true);
      setErrorMsg("Please provide Valid Email");
      return;
    }
   
    const response = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    });
    const data =await response.json();
    if(response.status==401){
        // setUser({ name: "",email:"" });
        toast.error("Invalid Credentials", { position: toast.POSITION.TOP_CENTER}); 
    }
// console.log(data);
    if(response.status==201){     
        console.log("User")
        setId(data.existUser._id)
        history.push("/newUser")
    }
  };
  const handelChnage = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser({ ...user, [name]: value });
  };
  const handelCount=()=>{
    if(checkCount){
        setcheckCount(false)
    }
    else{
      setcheckCount(true)
    }

  }
  
  return (
    <>
      <div className="form-conatiner">
      <div className="countAddUpdate">
<h1>{checkCount?count:""}</h1>
          </div>
        <div className="form-div">
          <h1>Update Form</h1>

          {error && (
            <div className="errorMsg" className="errorMsg">
              {" "}
              <Typography>{errorMsg}</Typography>{" "}
            </div>
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
            <Button
              color="primary"
              variant="contained"
              onClick={handelUpdateBtn}
            >
              Update
            </Button>
          </div>
          <div className="countBtn">
          <Button
              color="primary"
              variant="contained"
              style={{marginTop:'1rem'}}
              onClick={handelCount}
            >
              Count
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
// module.exports=Update;
export default Update;
