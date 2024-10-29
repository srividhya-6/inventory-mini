import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Cell, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PieCharts.css';  // Import the CSS file
import HeaderComponent from "./header";
import FooterComponent from "./footer";
const orderStaus = [
  { staus: 'delivered', quan: 40 },
  { staus: 'Pending', quan: 50 },
  { staus: 'cancelled', quan: 30 },
];
const data = [
  { loc: 'row1', quantity: 40 },
  { loc: 'row2', quantity: 30 },
  { loc: 'row3', quantity: 20 },
  { loc: 'row4', quantity: 27 },
  { loc: 'row5', quantity: 18 },
  { loc: 'row6', quantity: 23 },
  { loc: 'row7', quantity: 34 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
function DataAnalysis() {
  let [products,setProducts]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8082/api/products").then(response=> {
        console.log(response.data);
        setProducts(response.data)
  })},[])
  return (
    <>
     <HeaderComponent></HeaderComponent>
    <div className="analysis-container">
      <h1 className="page-title">Data Analysis Dashboard</h1>
      <h2 className="chart-title">Stock Present</h2>  
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={products} margin={{ top: 100, right: 30, left: 30, bottom: 1 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="chart-title">Orders</h2>
      <ResponsiveContainer width="80%" height={400}>
        <PieChart>
          <Pie data={orderStaus} nameKey="staus" dataKey="quan" fill="#8884d8" label>
            {orderStaus.map((entry, index) => (
              <Cell key={`cell-${entry.staus}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <FooterComponent></FooterComponent>
    </>
  );
}

export default DataAnalysis;
