
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useState ,useContext} from 'react';

import Stack from '@mui/material/Stack';
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
                
                console.log("welcome")
                setValid(false)
                navigate(`/products/${res[0]._id}`)
            }
    
        })
    }
    return (
        <>
       <form>
             <TextField id="filled-basic" label="Email" name="email" variant="filled" onChange={updateUser} value={user.email}/><br /><br />
             
             <TextField id="filled-basic" label="Password" name="password" variant="filled" onChange={updateUser} value={user.password}/><br /><br />

             
             <Button variant="contained" onClick={validateUser}>login</Button>
        </form>
        {valid?<Alert severity="error">Incorrect email or password</Alert>:""}
        </>
        
    )
}