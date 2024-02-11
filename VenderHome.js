import React from "react";

function VenderHome(props)
{
    return(
        <div>
            <center>
            <h4>Vender Home Page</h4>
            <h5>Welcome {props.data.vname}</h5>
            <img src={"http://localhost:2024/vender/getvenderimage/"+props.data.vpicname} height={100} width={100}/>
            </center>
        </div>
    );
}export default VenderHome;