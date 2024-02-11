import React,{useEffect, useState}from "react";
import axios from "axios";

function ProductCategory()
{
    const[pcatgid,setPCatgId]=useState();
    const[pcatgname,setPCatgName]=useState();
    const[pcatglist,setPCatgList]=useState([]);

    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value);
    }
    const handlePCatgNameText=(evt)=>{
        setPCatgName(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:2024/productcatg/showproductcatg")
        .then((res)=>{
            setPCatgList(res.data);
            setPCatgId(res.data.length+1);
        }).catch(err=>{
            alert(err);
        })
    });
    const handleSaveButton=()=>{
        var obj={
            pcatgid :pcatgid,
            pcatgname:pcatgname
        };
        axios.post("http://localhost:2024/productcatg/addproductcatg/"+pcatgid+"/"+pcatgname)
        .then((res)=>{
            alert('product category saved');
        }).catch((err)=>{
            alert(err);
        })
    }
const handleShowButton=()=>{
    //skip20 lies
}
return(
    <div>

        <center>
            <p style={{color:"red"}}>product category form</p>

            <table>
                <tr>
                    <td>Category ID</td>
                    <td>
                        {pcatgid}
                    </td>
                </tr>
                <tr>
                    <td>Category Name</td>
                    <td>
                        <input type="text" className="form-control" onChange={handlePCatgNameText}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <button type="submit" onClick={handleSaveButton}>save</button>
                    </td>
                </tr>
            </table>

                <p style={{color:"red", backgroundColor:"gray"}}>Product Category List</p>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                </tr>
                {
                    pcatglist.map((item)=>(
                        <tr>
                            <td>{item.pcatgid}</td>
                            <td>{item.pcatgname}</td>
                        </tr>
                    ))
                }
            </table>
        </center>
    </div>
);
}export default ProductCategory;         