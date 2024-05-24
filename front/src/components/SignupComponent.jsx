import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    axios.post("http://localhost:8082/signup",user).then(response=>
     {
        let u=response.data
        console.log(response.data);
        let order={
            userId:u._id,
            items:[],
            totalPrice:0,
            status:"no orders placed",
            orderDate: new Date().toLocaleDateString()
        }
        axios.post("http://localhost:8082/api/orders",order).then(res=>{
            navigate(`/products/${u._id}`)
        })
        

    })
   }
    return (
        <form>
             <TextField id="filled-basic" label="Name" name="name" variant="filled" onChange={updateUser} value={user.name}/><br /><br />
             <TextField id="filled-basic" label="Email" name="email" variant="filled" onChange={updateUser} value={user.email}/><br /><br />
             <TextField id="filled-basic" label="Password" name="password" variant="filled" onChange={updateUser} value={user.password}/><br /><br />

             <TextField id="filled-basic" label="Role" name="role" variant="filled" onChange={updateUser} value={user.role}/><br /><br />
             <Button variant="contained" onClick={addUser}>signup</Button>
        </form>
    )
}