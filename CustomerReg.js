import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerReg()
{
    const[cuserid,setCUserId]=useState('');
    const[cuserpass,setCUserPass]=useState();
    const[customername,setCustomerName]=useState();
    const[stid,setStId]=useState();
    const[ctid,setCtId]=useState();
    const[caddress,setCAddress]=useState();
    const[ccontact,setCContact]=useState();
    const[cemail,setCEmail]=useState();
    const[cpicname,setCPicName]=useState();
    const[cid,setCId]=useState();
    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);
    const[image,setImage]=useState({preview:'',data:''});
    const[status,setStatus]=useState('');
    const[error,setError]=useState(false);

    function loginHandle(e){
        e.preventDefault()
    }
    
    const handleCUserIdText=(evt)=>{
        setCUserId(evt.target.value)
        let item=evt.target.value;
        if(item.length<3)
        {
            setError(true)
        }
        else
        {
            setError(false)
        }
    }
    const handleCUserPassText=(evt)=>{
        setCUserPass(evt.target.value)
    }
    const handleCustomerNameText=(evt)=>{
        setCustomerName(evt.target.value)
    }
    const handleStIdSelect=(evt)=>{
        // alert(evt.target.value)
        setStId(evt.target.value)
        axios.get("http://localhost:2024/city/showcitybystate/"+evt.target.value).then((res)=>{
            setCtList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    const handleCtIdSelect=(evt)=>{
        setCtId(evt.target.value)
    }
    const handleCAddressText=(evt)=>{
        setCAddress(evt.target.value)
    }
    const handleCContactText=(evt)=>{
        setCContact(evt.target.value)
    }
    const handleCEmailText=(evt)=>{
        setCEmail(evt.target.value)
    }
    const handleCIdText=(evt)=>{
        setCId(evt.target.value)
    }

    useEffect(()=>{
        axios.get("http://localhost:2024/customers/getcustomercount/").then((res)=>{
            setCId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:2024/state/showstate/").then((res)=>{
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);


    
    const handleRegisterButton=()=>{
        var obj={
            CUserId:cuserid,
            CUserPass:cuserpass,
            CustomerName:customername,
            StId:stid,
            CtId:ctid,
            CAddress:caddress,
            CContact:ccontact,
            CEmail:cemail,
            CPicName:cpicname,
            CId:cid
        }
        axios.post("http://localhost:2024/customers/register/",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        });
        
    }

    // browse and save image code
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data);
        const response = await fetch('http://localhost:2024/customers/savecustomerimage/',
            {
                method: 'POST',
                body: formData,
            })
        if (response) {
            if (response.statusText == 'ok') {
                setStatus("File Uploaded Successfully");
                alert("image uploaded")
            } else {
                setStatus("Failed To Upload File")
            }
        }
    }

    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img)
        setCPicName(evt.target.files[0].name);
    }

    return(
        <div>
            <center>
                <form onSubmit={loginHandle}>
                <p>Customer Registration Form</p>
                <table>
                    <tr>
                        <td>Customer Id</td>
                        <td>{cid}</td>
                    </tr>
                    <tr>
                        <td>Customer User Id</td>
                        <td>
                            <input type="text" onChange={handleCUserIdText} required placeholder="User Id" />
                        </td>
                        <td>
                            {error?<span>this field can't be empty</span>:""}
                        </td>
                    </tr>
                    <tr>
                        <td>Customer User Password</td>
                        <td>
                            <input type="password" onChange={handleCUserPassText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>
                            <input type="text" onChange={handleCustomerNameText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Select State</td>
                        <td>
                            <select onClick={handleStIdSelect}>
                                {
                                    stlist.map((sitems)=>(
                                        <option value={sitems.stid}>{sitems.stname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Select City</td>
                        <td>
                            <select onClick={handleCtIdSelect}>
                                {
                                    ctlist.map((citems)=>(
                                        <option value={citems.ctid}>{citems.ctname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Address</td>
                        <td>
                            <input type="text" onChange={handleCAddressText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Contact</td>
                        <td>
                            <input type="contact" minLength={10} maxLength={10} onChange={handleCContactText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Email</td>
                        <td>
                            <input type="email" onChange={handleCEmailText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Select Photo</td>
                        <td>
                            <input type="file" onChange={handleFileChange} name="file"/>
                            <img src={image.preview} width={100} height={100}/> 
                        </td>
                    </tr>
                    <tr>
                        <td>Click to Upload Customer Photo</td>
                        <td>
                            <button onClick={handleSubmit}>upload</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button onClick={handleRegisterButton}>register</button>
                        </td>
                    </tr>
                </table>
                </form>
            </center>
        </div>
    );
}export default CustomerReg;