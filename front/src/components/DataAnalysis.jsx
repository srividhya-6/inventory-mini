import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Cell, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PieCharts.css';  // Import the CSS file
const orderStaus = [
  { staus: 'delivered', quan: 40 },
  { staus: 'Pending', quan: 50 },
  { staus: 'cancelled', quan: 30 },
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
  );
}

export default DataAnalysis;
