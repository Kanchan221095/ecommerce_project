import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import VenderHome from "./VenderHome";

function VenderLog()
{
    const[vuid,setVUId]=useState();
    const[vupass,setVUPass]=useState();

    const handleVUIdText=(evt)=>{
        setVUId(evt.target.value)
    }
    const handleVUPassText=(evt)=>{
        setVUPass(evt.target.value)
    }
    const handleLoginButton=()=>{
        axios.get("http://localhost:2024/vender/login/"+vuid+"/"+vupass).then((res)=>{
            if(res.data.VUserId!=undefined)
            {
                const root=ReactDOM.createRoot(document.getElementById("root"));
                var obj={
                    vname:res.data.VenderName,
                    vpicname:res.data.VPicName
                }
                root.render(<VenderHome data={obj}/>)
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
                <h4>Vender Login Form</h4>
                <table>
                    <tr>
                        <td>Vender User Id</td>
                        <td>
                            <input type="text" onChange={handleVUIdText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender User Password</td>
                        <td>
                            <input type="password" onChange={handleVUPassText}/>
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
}export default VenderLog;