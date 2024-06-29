
import { useNavigate, useParams } from "react-router-dom"
import HeaderComponent from "./header"
import { useEffect, useState } from "react"
import axios from "axios";
import FooterComponent from "./footer";
export default function EditUserComponent(){
    let [user,setUser]=useState({});
    let [password,setPassword]=useState("")
    const navigate=useNavigate()
    let {id}=useParams()
    useEffect(function userDetails(){
        console.log(id)
        axios.get(`http://localhost:8082/user/${id}`).then(res=>
         {
            setUser(res.data)
         })
    },[])
    function updateUser(e){
      e.preventDefault()
      let fname=e.target.name;
      let value=e.target.value;
      setUser((user)=>{
          user[fname]=value;
          return {...user}
      })
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};
  function editUser(e){
    e.preventDefault()
    if (!user.username || !user.email) {
      alert("UserName and Email should be filled.");
      return;
    }
    else if(password!=user.password){
      
      alert("password does not match !!")
      return;
    }
    axios.put(`http://localhost:8082/user/${id}`,user).then(response=>
     {
        
        console.log(response.data);
        navigate(`/login`)

    })
}
    return(
        <>
        <HeaderComponent></HeaderComponent>
        <div class="container">
        <h2 class="form-title">Edit Your Details</h2>
        <form id="addProductForm" class="product-form">
          <div class="form-group">
            <label for="productName" class="form-label">UserName:</label>
            <input type="text" id="productName" name="username" class="form-input" value={user.username} onChange={updateUser} required/>
          </div>
          <div class="form-group">
            <label for="productDescription" class="form-label">Email:</label>
            <textarea id="productDescription" name="email" class="form-textarea" rows="1" value={user.email} onChange={updateUser} required></textarea>
          </div>
          <div class="form-group">
            <label for="productDescription" class="form-label">Profile URL:</label>
            <textarea id="productDescription" name="profile" class="form-textarea" rows="3" value={user.profile} onChange={updateUser} required></textarea>
          </div>
          <div class="form-group">
            <label for="productPrice" class="form-label">New Password:</label>
            <input type="text" id="productPrice" name="password" class="form-input"  onChange={updateUser} required/>
          </div>
          <div class="form-group">
            <label for="productQuantity" class="form-label">Confirm Password:</label>
            <input type="password" id="productQuantity" name="quantity" class="form-input"   onChange={handlePasswordChange} required/>
          </div>
          
          <div class="form-group">
            <button type="submit" class="form-button" onClick={editUser}>Edit Product</button>
          </div>
        </form>
       </div>
        <FooterComponent></FooterComponent>
       </>
    )
}