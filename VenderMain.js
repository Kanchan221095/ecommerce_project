import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function VenderMain()
{
    return(
        <div>
            <h4 style={{fontFamily:'fantasy'}}>Vender Main Page</h4>
            <nav>
                <Link to="/venderreg" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Registration</Link><span></span>
                <Link to="/venderlog" style={{margin: '50px', textDecoration:'none', fontFamily:'fantasy', color:'black'}}>Login</Link>
            </nav>
        </div>
    );

}export default VenderMain;