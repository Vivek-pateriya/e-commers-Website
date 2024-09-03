import React, { useState } from "react";
import ProductList from '../productView/ProductList'
import ReactDom from 'react-dom/client'
function CustomerHome(props) {
  const [clicked, setClicked] = useState(false);
  const [cid, setCid] = useState();
  const handleShoppingButton = () => {
    // const root = ReactDom.createRoot(
    //   document.getElementById('root')
    // )
    console.log(props.data)
    setCid(props.data.cid);
    setClicked(true);
    // root.render(<ProductList data={cid} />)
  }
  if (clicked === true) {
    return <ProductList data={cid} />
  }
  return (
    <div>

      <h1>Customer ID{props.data.cid}</h1>
      <p>welcome to {props.data.cfname}</p>
      <p><img src={`http://localhost:9679/customer/getimage/${props.data.cpicname}`} alt={props.data.cpicname} width={300} height={300} /></p>
      <button onClick={handleShoppingButton}>Shopping</button>

    </div>)
} export default CustomerHome;