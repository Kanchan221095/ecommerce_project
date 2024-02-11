import React, { useEffect, useState } from "react";
import axios from "axios";

function VenderReg()
{
    const[vuserid,setVUserId]=useState();
    const[vuserpass,setVUserPass]=useState();
    const[vendername,setVenderName]=useState();
    const[vaddress,setVAddress]=useState();
    const[vcontact,setVContact]=useState();
    const[vemail,setVEmail]=useState();
    const[vpicname,setVPicName]=useState();
    const[vid,setVId]=useState();
    const[image,setImage]=useState({preview:'',data:''});
    const[status,setStatus]=useState('');

    const handleVUserIdText=(evt)=>{
        setVUserId(evt.target.value)
    }
    const handleVUserPassText=(evt)=>{
        setVUserPass(evt.target.value)
    }
    const handleVenderNameText=(evt)=>{
        setVenderName(evt.target.value)
    }
    const handleVAddressText=(evt)=>{
        setVAddress(evt.target.value)
    }
    const handleVContactText=(evt)=>{
        setVContact(evt.target.value)
    }
    const handleVEmailText=(evt)=>{
        setVEmail(evt.target.value)
    }
    const handleVIdText=(evt)=>{
        setVId(evt.target.value)
    }

    useEffect(()=>{
        axios.get("http://localhost:2024/vender/getvendercount").then((res)=>{
            setVId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        });
        // skip 5 lines
    });

    const handleRegisterButton=()=>{
        var obj={
            VUserId:vuserid,
            VUserPass:vuserpass,
            VenderName:vendername,
            VAddress:vaddress,
            VContact:vcontact,
            VEmail:vemail,
            VPicName:vpicname,
            VId:vid
        }
        axios.post("http://localhost:2024/vender/register/",obj).then((res)=>{
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
        const response = await fetch('http://localhost:2024/vender/savevenderimage/',
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
        setVPicName(evt.target.files[0].name);
    }

    return(
        <div>
            <center>
                <p>Vender Registration Form</p>
                <table>
                    <tr>
                        <td>Vender Id</td>
                        <td>{vid}</td>
                    </tr>
                    <tr>
                        <td>Vender User Id</td>
                        <td>
                            <input type="text" onChange={handleVUserIdText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender User Password</td>
                        <td>
                            <input type="password" onChange={handleVUserPassText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender Name</td>
                        <td>
                            <input type="text" onChange={handleVenderNameText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender Address</td>
                        <td>
                            <input type="text" onChange={handleVAddressText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender Contact</td>
                        <td>
                            <input type="number" maxLength={10} minLength={10} onChange={handleVContactText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vender Email</td>
                        <td>
                            <input type="email" onChange={handleVEmailText}/>
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
                        <td>Click to Upload Vender Photo</td>
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
            </center>
        </div>
    );
}export default VenderReg;