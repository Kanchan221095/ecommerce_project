import React, { useState, useEffect } from "react";
import axios from "axios";

function Product() 
{
    const [pid, setPId] = useState();
    const [pname, setPName] = useState();
    const [pprice, setPPrice] = useState();
    const [oprice, setOPrice] = useState();
    const [ppicname, setPPicName] = useState();
    const [pcatglist, setPCatgList] = useState([]);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [pcatgid, setPCatgId] = useState();
    const [status, setStatus] = useState('')
    const [plist, setPList] = useState([]);
    var cname = "";

    const handlePNameText = (evt) => {
        setPName(evt.target.value);
    }
    const handlePIdText = (evt) => {
        setPId(evt.target.value);
    }
    const handlePPriceText = (evt) => {
        setPPrice(evt.target.value);
    }

    const handleOPriceText = (evt) => {
        setOPrice(evt.target.value);
    }

    const handlePCatgSelect = (evt) => {
        setPCatgId(evt.target.value);
    }
    useEffect(() => {
        axios.get("http://localhost:2024/product/getmaxpid").then
            ((res) => {
                setPId(res.data.length + 1);
            }).catch((err) => {
                alert(err);
            });

        axios.get("http://localhost:2024/productcatg/showproductcatg").then
            ((res) => {
                setPCatgList(res.data);
            }).catch((err) => {
                alert(err);
            });
    }, []);
    const handleSaveButton = () => {
        var obj = {
            pid: pid,
            pname: pname,
            pprice: pprice,
            oprice: oprice,
            ppicname: ppicname,
            pcatgid: pcatgid
        };
        axios.post("http://localhost:2024/product/saveproduct/", obj).then
            ((res) => {
                alert("Product Saved");
            }).catch((err) => {
                alert(err);
            });
    }
    const handleShowButton = () => {
        axios.get("http://localhost:2024/product/showproduct").then
            ((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
    }




    // browse and save images

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data);
        const response = await fetch('http://localhost:2024/product/saveproductimage/',
            {
                method: 'POST',
                body: formData,
            })
        if (response) {
            if (response.statusText == 'ok') {
                setStatus("File Uploaded Successfully");
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
        setPPicName(evt.target.files[0].name);
    }
    return (
       
        <div style={{backgroundColor:"#f9ebea"}}>
            <center>
                <h1 style={{ backgroundColor: "black", borderRadius:"30px",width:"300px",color:"white" }}>Product Form</h1> 
                <table>
                    <tr>
                        <td><b>Product Id</b></td>
                        <td>{pid}</td>
                    </tr>

                    <tr>
                        <td><b>Product Name</b></td>
                        <td>
                            <input type="text" onChange={handlePNameText} />
                        </td>
                    </tr>

                    <tr>
                        <td><b>Price</b></td>
                        <td>
                            <input type="number" onChange={handlePPriceText} />
                        </td>
                    </tr>

                    <tr>
                        <td><b>Offer Price</b></td>
                        <td>
                            <input type="number" onChange={handleOPriceText} />
                        </td>
                    </tr>

                    <tr>
                        <td><b>Select Photo</b></td>
                        <td>
                            <input type="file" onChange={handleFileChange} name="file" />
                            <img src={image.preview} style={{backgroundColor:"white"}} width='100' height='100'  />
                        </td>
                    </tr>

                    <tr>
                        <td><b>Upload Photo</b> </td>
                        <td>
                            <button type="submit" onClick={handleSubmit}>Upload</button>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Category</b></td>
                        <td>
                            <select onClick={handlePCatgSelect}>
                                {
                                    pcatglist.map((item) => (
                                        <option value={item.pcatgid}>
                                            {item.pcatgname}
                                        </option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" onClick={handleSaveButton}>Save</button>
                        </td>
                        <td>
                            <button type="submit" onClick={handleShowButton}>Show</button>
                        </td>
                    </tr>
                </table>
                <h1 style={{backgroundColor: "blue", borderRadius:"30px",width:"300px",color:"white"}}>Product List</h1>
                <table style={{ backgroundColor:"#E8FFFF"}} border={1}>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Price Price</th>
                        <th>Offer Price</th>
                        <th>Category Id</th>
                        <th>Category Name</th>
                        <th>Product Photo</th>
                    </tr>
                    {
                        plist.map((item) => (
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>{item.pcatgid}</td>
                                <td>
                                    {
                                        pcatglist.map((citem) => {
                                            if (item.pcatgid == citem.pcatgid) {
                                                cname = (citem.pcatgname)
                                            }

                                        })
                                    }
                                    {cname}
                                </td>

                                <td>
                                    
                                    <img src={"http://localhost:2024/product/getproductimage/" + item.ppicname}
                                        height="100" width="100" />
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )

} export default Product;



