import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function CustomerMain()
{
    return(
        <div>
            <h4 style={{fontFamily:'fantasy'}}>Customer Main Page</h4>
            <nav>
                <Link to="/customerreg" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Registration</Link><span></span>
                <Link to="/customerlog" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Login</Link>
            </nav>
        </div>
    );
}export default CustomerMain;