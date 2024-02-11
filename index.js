import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductCategory from './productviews/ProductCategory';
import Product from './productviews/Product';
import VenderReg from './venderview/VenderReg';
import VenderLog from './venderview/VenderLog';
import StateForm from './statecityviews/StateForm';
import CityForm from './statecityviews/CityForm';
import CustomerReg from './customerviews/CustomerReg';
import CustomerLog from './customerviews/CustomerLog';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MainPage/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
