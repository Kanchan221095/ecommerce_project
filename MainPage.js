import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import epic from "./ecommerce.jpg"
import CustomerMain from "./CustomerMain";
import VenderMain from "./VenderMain";
import AdminMain from "./AdminMain";
import ProductMain from "./ProductMain";
import ProductCategory from "./productviews/ProductCategory";
import Product from "./productviews/Product";
import ProductList from "./productviews/ProductList";
import VenderReg from "./venderview/VenderReg";
import VenderLog from "./venderview/VenderLog";
import CustomerReg from "./customerviews/CustomerReg";
import CustomerLog from "./customerviews/CustomerLog";

function MainPage()
{
    return(
        <div>
            <center>
                <img src={epic} height={300} width="80%"/>
                <nav>
                    <Link to="/adminmain" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>ADMIN</Link>
                    <Link to="/productmain" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>PRODUCT</Link>
                    <Link to="/vendermain" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>VENDER</Link>
                    <Link to="/customermain" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>CUSTOMER</Link>
                </nav>
                <h3 style={{fontFamily:'fantasy'}}>Welcome to E-commerce Website</h3>
                <p></p>
                <Routes>
                    <Route path="/adminmain" element={<AdminMain/>}/>
                    <Route path="/customermain" element={<CustomerMain/>}/>
                    <Route path="/vendermain" element={<VenderMain/>}/>
                    <Route path="/productmain" element={<ProductMain/>}/>
                    <Route path="/productcategory" element={<ProductCategory/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/productlist" element={<ProductList/>}/>
                    <Route path="/venderreg" element={<VenderReg/>}/>
                    <Route path="/venderlog" element={<VenderLog/>}/>
                    <Route path="/customerreg" element={<CustomerReg/>}/>
                    <Route path="/customerlog" element={<CustomerLog/>}/>
                </Routes>
                <marquee><h1>E-commerce Website Made By Kanchan Chakrawarty</h1></marquee>
            </center>
        </div>
    );
}export default MainPage;