import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import CustomerHome from "./CustomerHome";

function CustomerLog()
{
    const[uid,setUId]=useState();
    const[upass,setUPass]=useState();

    const handleUIdText=(evt)=>{
        setUId(evt.target.value)
    }
    const handleUPassText=(evt)=>{
        setUPass(evt.target.value)
    }
    const handleLoginButton=()=>{
        axios.get("http://localhost:2024/customers/login/"+uid+"/"+upass).then((res)=>{
            if(res.data.CUserId!=undefined)
            {
                const root=ReactDOM.createRoot(document.getElementById("root"));
                var obj={
                    cname:res.data.CustomerName,
                    cpicname:res.data.CPicName,
                    cid:res.data.CId
                }
                root.render(<CustomerHome data={obj}/>)
            }
            else
            {
                alert("Invalid Id/Password");
            }
        });
    }
    return(
        <div>
            <center>
                <h4>Customer Login Form</h4>
                <table>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" onChange={handleUIdText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>User Password</td>
                        <td>
                            <input type="password" onChange={handleUPassText}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={handleLoginButton}>login</button>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    );
}export default CustomerLog;