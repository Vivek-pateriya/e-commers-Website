import React, { useState } from "react";
import Product from '../productView/Product'
import ReactDom from 'react-dom/client'
function VenderHome(props) {
    const [clicked, setClicked] = useState(false);
    const [vid, setVid] = useState();
    const handleShoppingButton = () => {
        // const root = ReactDom.createRoot(
        //     document.getElementById('root')
        // )

        console.log(props.data)
        setVid(props.data.vid);
        setVid(props.data.cid);
        setClicked(true);
        // root.render(<Product data={vid} />)
    }
    if (clicked === true) {
        return <Product data={vid} />
    }
    return (
        <div>

            <h1>vender ID{props.data.vid}</h1>
            <p>welcome to {props.data.vfname}</p>
            <p><img src={`http://localhost:9679/vender/getimage/${props.data.vpicname}`} alt={props.data.vpicname} width={300} height={300} /></p>
            <button onClick={handleShoppingButton}>Shopping</button>

        </div>)
} export default VenderHome;