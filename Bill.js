import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.svg";

function Bill(props) {
    const [mydate, setMyDate] = useState();
    const [mydates, setMyDates] = useState();
    const [cname, setCName] = useState();
    const [caddress, setCAddress] = useState();
    const [ccontact, setCContact] = useState();
    var total = 0;

    useEffect(() => {
        // alert("welcome"+props.data.cid)
        axios.get("http://localhost:2024/customers/getcustomerdetails/" + props.data.cid).then((res) => {
            setCName(res.data.CustomerName);
            setCAddress(res.data.CAddress);
            setCContact(res.data.CContact);
            myDateFun();
        }).catch((err) => {
            alert(err);
        })
    }, []);

    function myDateFun() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let stringDate = date.toDateString()
        let currentDate = `${day}-${month}-${year}`;
        // let currentDates=;
        console.log(currentDate);
        setMyDate(currentDate);
        setMyDates(`${stringDate}`);
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


        async function displayRazorpay() {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load.Are you online?");
                return;
            }
            var myamount = total * 100;
            //creating a new order
            const result = await axios.post("http://localhost:2024/payment/orders/" + myamount);

            if (!result) {
                alert("Server error.Are you online?");
                return;
            }

            //GETTING THE ORDER DETAILS BACK
            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: "rzp_test_8CxHBNuMQt1Qn8",
                //key:"rzp_test_r6FiJfddJh76SI",//Enter the key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "Universal Informatics Pvt Ltd Indore",
                description: "Test Transaction",
                image: { logo },
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };


                    const result = await axios.post("http://localhost:2024/payment/success/", data);
                    alert(result.data);
                    if(result.data==="Payment Successfully done")
                    {
                        SaveBill();
                        alert("Bill Saved")
                    }
                },
                prefill: {
                    name: "Universal Informatics",
                    email: "universal@gmail.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Universal Informatics Indore Pvt.Ltd.",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        
        function SaveBill()
        {
            var billid=0;
            axios.get("http://localhost:2024/bill/getmaxbid").then((res)=>{
                billid=res.data.length + 1;

                props.data.selitems.map((item)=>{
                    var obj={
                        bid:billid,
                        pid:item.pid,
                        pname:item.pname,
                        oprice:item.oprice,
                        ppicname:item.ppicname,
                        CId:props.data.cid,
                        CustomerName:cname,
                        billdate:mydate
                    };
                    axios.post("http://localhost:2024/bill/savebill/",obj).then((res)=>{
                        // alert(res.data);
                    }).catch((err)=>{
                        alert(err);
                    });
                });
            }).catch((err)=>{
                alert(err);
            });           
            
        }
        //getting the order details back
        //     const {amount, id:order_id, currency}=result.data;

        //     const options={
        //         key:"rzp_test_8CxHBNuMQt1Qn8",
        //         amount:amount.toString(),
        //         currency:currency,
        //         name:"Kanchan Enterprises",
        //         description:"test transaction",
        //         image:{logo},
        //         order_id:order_id,

        //         handler:async function(response)
        //         {
        //             const data={
        //                 order_CreationId:order_id,
        //                 razorpayPaymentId:response.razorpay_payment_id,
        //                 razorpayOrderId:response.razorpay_order_id,
        //                 razorpaySignature:response.razorpay_signature,
        //             };
        //             const result=await axios.post("http://localhost:2024/payment/success/",data);

        //             alert(result.data.msg);
        //         },
        //         prefill:{
        //             name:"Kanchan Enterprises",
        //             email:"kanchan22@gmail.com",
        //             contact:"9926514559"
        //         },
        //         notes:{
        //             address:"rau indore",
        //         },
        //         theme:{
        //             color:"#55555a"
        //         },
        //     };

        //     const paymentObject= new window.Razorpay(options);
        //     paymentObject.open();
        // }
        return (
            <div>
                <table>
                    <tr>
                        <td>Customer Id</td>
                        <td>{props.data.cid}</td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>{cname}</td>
                    </tr>
                    <tr>
                        <td>Customer Address :</td>
                        <td>{caddress}</td>
                    </tr>
                    <tr>
                        <td>Customer Contact :</td>
                        <td>{ccontact}</td>
                    </tr>
                    <tr>
                        <td>Bill Number Date :</td>
                        <td>{mydate}</td>
                    </tr>
                    <tr>
                        <td>Bill String Date :</td>
                        <td>{mydates}</td>
                    </tr>
                </table>
                <center>
                    <h4>Bill</h4>
                    <table border={1}>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Photo</th>
                        </tr>
                        {
                            props.data.selitems.map((item) => (
                                <tr>
                                    <td>{item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.oprice}</td>
                                    <td>
                                        <img src={"http://localhost:2024/product/getproductimage/" + item.ppicname} height="50" width="50" />
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                    {
                        props.data.selitems.map((item) => {
                            total = total + item.oprice;
                        })
                    }
                    <h4>Total Amount = {total}</h4>
                    <button type="submit" onClick={displayRazorpay}>payment</button>
                </center>
            </div>
        );
    } export default Bill;