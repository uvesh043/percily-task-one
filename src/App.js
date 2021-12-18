import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form from './Component/Form'
import Update from './Component/update'
import NewUser from './Component/NewUser'
import { useEffect, useState } from 'react';

function App() {
  const [_id,setId]=useState("")
  const [count,setCount]=useState(0)
  const [checkCount,setcheckCount]=useState(false)
  useEffect(()=>{
console.log("this is from parent",_id)
  },[_id])
  return (
    <div className="APP">
       <Router>
     
     <Switch>
    
    
    
     <Route path="/" exact><Form  count={count} setCount={setCount} checkCount={checkCount} setcheckCount={setcheckCount}/></Route>

     <Route path="/update"  ><Update setId={setId}  count={count} setCount={setCount} checkCount={checkCount} setcheckCount={setcheckCount}/></Route>

     <Route path="/newUser" ><NewUser _id={_id} /></Route>
     </Switch>
    
    </Router>
    </div>
  );
}

export default App;
