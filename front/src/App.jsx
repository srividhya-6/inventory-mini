import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeComponent from './components/HomeComponent'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import AdminProductComponent from './components/AdminProductComponent' 
import UserProductComponent from './components/UserProductComponent' 
import NewProductComponent from './components/NewProductComponent'
import EditProductComponent from './components/EditProductComponent'
import OrdersComponent from "./components/OrdersComponent"
import AllOrdersComponent from "./components/AllOrdersComponent"
import AccountComponent from './components/AccountComponent'

function App() {
  
  return (
    <BrowserRouter>
    
      <Routes>
        
        <Route path="/" exact element={<HomeComponent></HomeComponent>}/>
        <Route path="/login" exact element={<LoginComponent></LoginComponent>}/>
        <Route path="/signup" exact element={<SignupComponent></SignupComponent>}/>
        <Route path="/products" exact element={<AdminProductComponent></AdminProductComponent>}/>
        {/* <Route path="/products" exact element={<UserProductComponent></UserProductComponent>}/> */}
        <Route path="/orders/admin/:id" exact element={<AllOrdersComponent></AllOrdersComponent>}/>
        <Route path="/orders/user/:id" exact element={<OrdersComponent></OrdersComponent>}/>
        <Route path="/products/admin/:id" exact element={<AdminProductComponent></AdminProductComponent>}/>
        <Route path="/products/user/:id" exact element={<UserProductComponent></UserProductComponent>}/>
        <Route path="/product/new" exact element={<NewProductComponent></NewProductComponent>}/>
        <Route path="/account/:id" exact element={<AccountComponent></AccountComponent>}/>
        <Route path="/products/edit/:id" exact element={<EditProductComponent></EditProductComponent>}/>
        {/* <Route path="/products/delete" exact element={<ProductComponent></ProductComponent>}/> */}
        
        
      </Routes>
      
    </BrowserRouter>
   
  )
}

export default App
