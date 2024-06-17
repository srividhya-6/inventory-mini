import React, { useEffect, useState } from 'react';
import './account.css'; // Import your CSS file for styling if needed
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from './header';
import FooterComponent from './footer';
const AccountComponent = () => {
    
    let [user,setUser]=useState({});
    let {id}=useParams()
    useEffect(function userDetails(){
        console.log(id)
        axios.get(`http://localhost:8082/user/${id}`).then(res=>
         {
            console.log("ase"+res.data)
            setUser(res.data)
         })
    },[])
  return (
    <>
    <HeaderComponent></HeaderComponent>
    <div className="account">
      <div className="profile">
        <img src={user.profile} alt="Profile" className="profile-pic" />
        <h2>{user.username}</h2>
      </div>
      <div className="details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
    <FooterComponent></FooterComponent>
    </>
  );
}

export default AccountComponent;
