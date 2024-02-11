import React, { useEffect, useState } from "react";
import axios from "axios";
import fl from "../fl.jpg"

function MyOrder(props)
{
    const [blist,setBList]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:2024/bill/showbill/"+props.cid).then((res)=>{
            setBList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    return(
        <div style={{backgroundImage:`url(${fl})`}}>
            <center>
            <h5 style={{backgroundColor:"black", color:"wheat"}}>My Orders</h5>
            <p style={{backgroundColor:"black", color:"wheat", fontWeight:"bolder"}}>Customer Id{props.cid}</p>
            <table border={10} bgcolor="black" style={{backgroundColor:"black", color:"wheat"}}>
                <tr>
                    <th>Bill No.</th>
                    <th>Date of Billing</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                </tr>
                {
                    blist.map((item)=>(
                        <tr>
                            <td>{item.bid}</td>
                            <td>{item.billdate}</td>
                            <td>{item.pid}</td>
                            <td>{item.pname}</td>
                            <td>{item.oprice}</td>
                        </tr>
                    ))
                }
            </table>
            </center>
        </div>
    )
}export default MyOrder;