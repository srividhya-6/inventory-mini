
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useState ,useContext} from 'react';
import "./login.css"
import Stack from '@mui/material/Stack';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function LoginComponent(){
    let navigate=useNavigate()
    let [valid,setValid]=useState(false)
    
    let [user,setUser]=useState({
        email:"",
        password:""
    });
    function updateUser(e){
        e.preventDefault();
        let name=e.target.name;
        let value=e.target.value;
        setUser((user)=>{
            user[name]=value;
            return {...user}
        })
       }
      
    function validateUser(e){
        e.preventDefault()
        axios.post("http://localhost:8082/login",user).then(response=>
         {
            let res=response.data;
            if(res==""){
                console.log("not a valid user");
                setValid(true)
                
                navigate("/login")   
            }
            else{
                cookies.set('role', (res[0].role), { path: '/' });
                cookies.set('id', (res[0]._id), { path: '/' });
                cookies.set('profile',((res[0].profile)),{path:'/'})
                
                setValid(false)
                if(cookies.get('role')=='admin')
                navigate(`/products/admin/${res[0]._id}`)
            else{
                navigate(`/products/user/${res[0]._id}`)
            }
            }
    
        })
    }
    return (
        <>
        <div class="body">
        <div class="login-container">
        <form class="login-form">
            <h2>Login</h2>
            <div class="input-group">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" onChange={updateUser} value={user.email} required/>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" onChange={updateUser} value={user.password} required/>
            </div>
            <button type="submit" class="login-button" onClick={validateUser}>Login</button><br /><br />
            Don't have an account ? <button type="submit" class="signup-button" onClick={()=>navigate("/signup")}>Sign Up</button>
        </form>
        {valid?<Alert severity="error">Incorrect email or password</Alert>:""}
    </div>
    </div>
    </>
        
    )
}