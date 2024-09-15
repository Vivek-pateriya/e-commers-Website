import React, { useState } from "react";
import ProductList from '../productView/ProductList'
import ReactDom from 'react-dom/client'
// import Bill from "./bill";
import BillBYId from "./BillBYId";
function CustomerHome(props) {
  const [clickedSButton, setClickedSButton] = useState(false);
  const [clickedBillButton, setClickedBillButton] = useState(false);
  const [cid, setCid] = useState();
  const handleShoppingButton = () => {
    // const root = ReactDom.createRoot(
    //   document.getElementById('root')
    // )
    console.log(props.data)
    setCid(props.data.cid);
    setClickedSButton(true);
    // root.render(<ProductList data={cid} />)
  }
  const handleBillButton = () => {
    setCid(props.data.cid);
    setClickedBillButton(true)
  }
  if (clickedSButton === true) {
    return <ProductList data={cid} />
  }
  if (clickedBillButton === true) {
    return <BillBYId data={cid} />
  }
  return (
    <div>

      <h1>Customer ID{props.data.cid}</h1>
      <p>welcome to {props.data.cfname}</p>
      <p><img src={`http://localhost:9679/customer/getimage/${props.data.cpicname}`} alt={props.data.cpicname} width={300} height={300} /></p>
      <button onClick={handleShoppingButton}>Shopping</button>
      <button type="button" onClick={handleBillButton}>Show Bills</button>

    </div>)
} export default CustomerHome;