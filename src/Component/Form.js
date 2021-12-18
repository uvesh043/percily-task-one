import React, { useState } from "react";
import "./Css/form.css";
import { useHistory } from "react-router";
import { Typography, TextField, Checkbox, Button } from "@material-ui/core";
import {Link } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

const Form = (props) => {
    const history=useHistory();
    const count=props.count;
    const setCount=props.setCount;
    const checkCount=props.checkCount;
    const setcheckCount=props.setcheckCount;
    console.log(count)
//     const countHandel=()=>{
//         console.log(count)
// setCount(prevActiveStep => prevActiveStep +1)
//     }
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [error,setError]=useState(false);
  const [errorMsg,setErrorMsg]=useState("");

  const handelSubmitBtn = async(e) => {
      e.preventDefault();  
      setCount(preCount=>preCount+1)    
      console.log(count)
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
    const response = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
       
      }),
    });
    const data=await response.json();
    if(response.status==201){
        setUser({ name: "",email:"" });
        toast.success("Your have Created user Successfull", { position: toast.POSITION.TOP_CENTER});
        
    }
  };
  const handelUpdateBtn=()=>{
   history.push("/update")

  }
  const handelChnage = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    // console.log("Value", value, "name", name);
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
    <div className="form-conatiner">
      <div className="form-div">
          <div className="countAddUpdate">
<h1>{checkCount?count:""}</h1>
          </div>
      <div><h1>Form First Page</h1></div>
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
          <Button color="primary" variant="contained" onClick={handelSubmitBtn}>
            ADD
          </Button>
        </div>
        <div className="update-Btn">
        <Link to="/update">  <Button  color="primary" variant="contained"
        
         >
              
            Update
          </Button>
          </Link>
        </div>
        <div className="countBtn">
        <Button  color="primary" variant="contained"  onClick={handelCount}>Count</Button>    
        </div>
      </div>
    </div>
  );
        }      
export default Form;
