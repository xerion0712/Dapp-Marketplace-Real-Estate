import "./css/style.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-config";
import {BrowserRouter as Router, Routes, Route ,useNavigate} from "react-router-dom";



function _login() {
    let navigate = useNavigate();
    const [rEmail, setREmail] = useState("");
    const [rPassword, setRPassword] = useState("");
  
    const register = async () => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          rEmail,
          rPassword
        );
        console.log(user, "hello");
      } catch (err) {
        console.log(err.message);
      }
  
    };
    const login = async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, rEmail, rPassword);
        console.log(user, "hello");
      } catch (err) {
        console.log("User not found need to register!");
      }
  
    };
    const signout = () =>{
      auth.signOut();
    }
    auth.onAuthStateChanged((user) => {
        if(user){
          navigate("/roleselect");
          console.log("found")
        }
        else{
          console.log("Err login")
        }
      });

  return (
    <div className="App">
      <div className="banner">
        <p>Welcome</p>
      </div>

      <div id="detailsForm" className="form">
        <label htmlFor="username">Email-ID:</label>
        <input
          id="email"
          type="text"
          name="fname"
          onChange={(event) => {
            setREmail(event.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="lname"
          onChange={(event) => {
            setRPassword(event.target.value);
          }}
        />
        <input type="submit" value="Login" onClick={login} />
        <input type="submit" value="Register" onClick={register} />
        <input type="submit" value="SignOut" onClick={signout} />
      </div>
    </div> 
    

  );
}


export default _login;
