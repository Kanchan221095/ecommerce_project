import React from "react";
import ProductList from "../productviews/ProductList";
import ReactDOM from "react-dom/client";
import MyOrder from "./MyOrder";

function CustomerHome(props)
{
    const handleViewOrder=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
        root.render(<MyOrder cid={props.data.cid}/>)
    }
    const handleShoppingButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
        root.render(<ProductList data={cid}/>)
    }
    return(
        <div>
            <h1>Customer Id : {props.data.cid}</h1>
            <h4>Customer Home Page</h4>
            <h5>Welcome {props.data.cname}</h5>
            <img src={"http://localhost:2024/customers/getcustomersimage/"+props.data.cpicname} height={100} width={100}/>
            <button onClick={handleShoppingButton}>shopping</button>
            <button onClick={handleViewOrder}>View Order</button>
        </div>
    );
}export default CustomerHome;