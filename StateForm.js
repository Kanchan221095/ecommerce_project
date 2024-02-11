import React, { useEffect, useState } from "react";
import axios from "axios";

function StateForm()
{
    const[stid,setStId]=useState();
    const[stname,setStName]=useState();
    const[stlist,setStList]=useState([]);

    const handleStIdText=(evt)=>{
        setStId(evt.target.value);
    }
    const handleStNameText=(evt)=>{
        setStName(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:2024/state/showstate").then((res)=>{
            setStId(res.data.length+1);
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);
    const handleSaveButton=()=>{
        axios.post("http://localhost:2024/state/addstate/"+stid+"/"+stname).then((res)=>{
            alert("State Saved");
        }).catch((err)=>{
            alert(err);
        });
    }
    
    return(
        <div>
            <center>
                <h4>State Form</h4>
                <table>
                    <tr>
                        <td>State Id</td>
                        <td>{stid}</td>
                    </tr>
                    <tr>
                        <td>State Name</td>
                        <td>
                            <input type="text" onChange={handleStNameText}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={handleSaveButton}>save</button>
                        </td>
                    </tr>
                </table>
                <h6>State List</h6>
                <table border={1}>
                    <tr>
                        <th>State Id</th>
                        <th>State Name</th>
                    </tr>
                    {
                        stlist.map((item)=>(
                            <tr>
                                <td>{item.stid}</td>
                                <td>{item.stname}</td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default StateForm;