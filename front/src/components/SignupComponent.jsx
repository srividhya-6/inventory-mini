import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"
export default function SignupComponent(){
    
    let [user,setUser]=useState({});
let navigate=useNavigate()
   function updateUser(e){
    e.preventDefault();
    let name=e.target.name;
    let value=e.target.value;
    setUser((user)=>{
        user[name]=value;
        return {...user}
    })
   }
   function addUser(e){
    e.preventDefault()
    if (!user.username || !user.email || !user.password || !user.role) {
        alert('All fields are required');
        return;
      }
    axios.post("http://localhost:8082/signup",user).then(response=>
     {
        console.log(response.data)
        if(response.data=="")
        {
            alert("email already exists")
            
        }
        else{
        let u=response.data
        console.log(response.data);
        let order={
            userId:u._id,
            items:[],
            totalPrice:0,
            status:"no orders placed",
            orderDate: new Date().toLocaleDateString(),
            
        }
        axios.post("http://localhost:8082/api/orders",order).then(res=>{
            navigate(`/login`)
        })
    }
        

    })
   }
    return (
        <>
        <div class="body">
        <div class="login-container">
        <form class="login-form">
            <h2>SignUp</h2>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" onChange={updateUser} value={user.username} required="true"/>
            </div>
            <div class="input-group">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" onChange={updateUser} value={user.email} required/>
            </div>
            
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" onChange={updateUser} value={user.password} required/>
            </div>
            <div class="input-group">
                <label for="role">Role</label>
                <input type="text" id="role" name="role" onChange={updateUser} value={user.role} required/>
            </div>
            <div class="input-group">
                <label for="profile">Profile URL</label>
                <input type="text" id="profile" name="profile" onChange={updateUser} value={user.profile} required/>
            </div>
            <button type="submit" class="login-button" onClick={addUser}>Sign Up</button><br /><br />
            Already have an account? <button type="submit" class="signup-button" onClick={()=>navigate("/login")}>Login</button>
        </form>
        {/* {valid?<Alert severity="error">Incorrect email or password</Alert>:""} */}
    </div>
    </div>
  
        </>
    )
}