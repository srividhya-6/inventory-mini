import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeComponent from './components/HomeComponent'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import AdminProductComponent from './components/AdminProductComponent' 
import NewProductComponent from './components/NewProductComponent'
import EditProductComponent from './components/EditProductComponent'
import OrdersComponent from "./components/OrdersComponent"
import AllOrdersComponent from "./components/AllOrdersComponent"

function App() {
  
  return (
    <BrowserRouter>
    <HomeComponent></HomeComponent>
      <Routes>
        
        <Route path="/login" exact element={<LoginComponent></LoginComponent>}/>
        <Route path="/signup" exact element={<SignupComponent></SignupComponent>}/>
        <Route path="/products" exact element={<AdminProductComponent></AdminProductComponent>}/>
        <Route path="/orders" exact element={<AllOrdersComponent></AllOrdersComponent>}/>
        <Route path="/orders/:id" exact element={<OrdersComponent></OrdersComponent>}/>
        <Route path="/products/:id" exact element={<AdminProductComponent></AdminProductComponent>}/>
        <Route path="/product/new" exact element={<NewProductComponent></NewProductComponent>}/>
        <Route path="/products/edit/:id" exact element={<EditProductComponent></EditProductComponent>}/>
        {/* <Route path="/products/delete" exact element={<ProductComponent></ProductComponent>}/> */}
        
        
      </Routes>
      
    </BrowserRouter>
   
  )
}

export default App
