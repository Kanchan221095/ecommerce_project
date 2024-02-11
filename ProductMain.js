import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import gp from "./girlproduct.jpg"

function ProductMain()
{
    return(
        // <div style={{ backgroundImage:`url(${gp})`}}>
        <div>
            <h4 style={{fontFamily:'fantasy', color:'black'}}>Product Main Page</h4>
            <nav>
                <Link to="/productcatg" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Product Category</Link><span></span>
                <Link to="/product" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Product</Link><span></span>
                <Link to="/productlist" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Product List</Link>
            </nav>
        </div>
    );
}export default ProductMain;