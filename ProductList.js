import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import cart from "../cart.png";
import Bill from "../customerviews/Bill";
import gp from "../accessories.jpg";
import whitebg from "../whitebg.jpg";

function ProductList(props)
{
    const[itemcount,setItemCount]=useState(0);
    const[selitems,setSelItems]=useState([]);
    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);
    var cname="";

    useEffect(()=>{
        axios.get("http://localhost:2024/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:2024/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleBuyButton=(evt)=>{
        setItemCount(itemcount+1);
        plist.map((item)=>{
            if(item.pid==evt)
            {
                selitems.push(item);
            }
        });
    }

    const handleCheckOutButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var ccid=props.data;
        var obj={
            selitems:selitems,
            cid:ccid
        };
        root.render(<Bill data={obj}></Bill>)
    }

    return(
        <div style={{ backgroundImage:`url(${gp})`}}>
            <h1>Customer Id : {props.data}</h1>
            <div>
                <img src={cart} height="50" width="50"/>
                <label>{itemcount}</label>
                <button onClick={handleCheckOutButton}>CheckOut</button>
            </div>
            <center>
                <p>Product List</p>
                <table border={5} style={{backgroundImage:`url(${whitebg})`,backgroundRepeat:'no-repeat', }}>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product offer Price</th>
                        <th>Category Id</th>
                        <th>Category Name</th>
                        <th>Product Photo</th>
                        <th>Action</th>
                    </tr>
                    {
                        plist.map((item)=>(
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>{item.pcatgid}</td>
                                <td>
                                    {
                                        pcatglist.map((citem)=>{
                                            if(item.pcatgid==citem.pcatgid)
                                            {
                                                cname=(citem.pcatgname)
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:2024/product/getproductimage/"+item.ppicname} height="100" width="100"/>
                                </td>
                                <td>
                                    <button onClick={()=>handleBuyButton(item.pid)}>buy</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default ProductList;