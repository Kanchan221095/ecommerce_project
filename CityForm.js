import React, { useEffect, useState } from "react";
import axios from "axios";

function CityForm()
{
    const[ctid,setCtId]=useState();
    const[ctname,setCtName]=useState();
    const[stid,setStId]=useState();
    const[ctlist,setCtList]=useState([]);
    const[stlist,setStList]=useState([]);
    var sname="";

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value);
    }
    const handleCtNameText=(evt)=>{
        setCtName(evt.target.value);
    }
    const handleStIdSelect=(evt)=>{
        setStId(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:2024/city/showcity").then((res)=>{
            setCtId(res.data.length+1);
            setCtList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:2024/state/showstate").then((res)=>{
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleSaveButton=()=>{
        axios.post("http://localhost:2024/city/addcity/"+ctid+"/"+ctname+"/"+stid).then((res)=>{
            alert("City Saved");
        }).catch((err)=>{
            alert(err);
        });
    }

    return(
        <div>
            <center>
                <h2>City Form</h2>
                <table>
                    <tr>
                        <td>City Id</td>
                        <td>{ctid}</td>
                    </tr>
                    <tr>
                        <td>City Name</td>
                        <td>
                            <input type="text" onChange={handleCtNameText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>State Name</td>
                        <td>
                            <select onClick={handleStIdSelect}>
                                {
                                    stlist.map((item)=>(
                                        <option value={item.stid}>{item.stname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={handleSaveButton}>save</button>
                        </td>
                    </tr>
                </table>
                <h3>City List</h3>
                <table border="1">
                    <tr>
                        <th>City Id</th>
                        <th>City Name</th>
                        <th>State Id</th>
                        <th>State Name</th>
                    </tr>
                    {
                        ctlist.map((item)=>(
                            <tr>
                                <td>{item.ctid}</td>
                                <td>{item.ctname}</td>
                                <td>{item.stid}</td>
                                <td>
                                    {
                                        stlist.map((sitem)=>{
                                            if(item.stid==sitem.stid)
                                            {
                                                sname=(sitem.stname)
                                            }
                                        })
                                    }
                                    {sname}
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default CityForm;