import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeComponent from './components/HomeComponent'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import ProductComponent from './components/ProductComponent' 
import NewProductComponent from './components/NewProductComponent'
import EditProductComponent from './components/EditProductComponent'
import AllOrdersComponent from "./components/AllOrdersComponent"

function App() {
  
  return (
    <BrowserRouter>
    <HomeComponent></HomeComponent>
      <Routes>
        
        <Route path="/login" exact element={<LoginComponent></LoginComponent>}/>
        <Route path="/signup" exact element={<SignupComponent></SignupComponent>}/>
        <Route path="/products" exact element={<ProductComponent></ProductComponent>}/>
        <Route path="/orders/:id" exact element={<AllOrdersComponent></AllOrdersComponent>}/>
        <Route path="/products/:id" exact element={<ProductComponent></ProductComponent>}/>
        <Route path="/product/new" exact element={<NewProductComponent></NewProductComponent>}/>
        <Route path="/products/edit/:id" exact element={<EditProductComponent></EditProductComponent>}/>
        <Route path="/products/delete" exact element={<ProductComponent></ProductComponent>}/>
        
        
      </Routes>
      
    </BrowserRouter>
   
  )
}

export default App
