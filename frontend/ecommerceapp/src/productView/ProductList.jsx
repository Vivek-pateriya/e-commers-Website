import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './cart.png';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Bill from '../customer/bill';
function ProductList(props) {
  const [itemCount, setItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [clickedCheckout, setClickedCheckout] = useState(false);
  const [billData, setBillData] = useState([]);

  // Fetch product and category lists on component mount
  useEffect(() => {
    axios.get('http://localhost:9679/product/showproduct')
      .then((res) => {
        setProducts(res.data);
      })
      .catch(err => {
        alert(err.message);
      });

    axios.get('http://localhost:9679/productCat/show')
      .then((res) => {
        setProductCategories(res.data);
        // console.log(productCategories);

      })
      .catch(err => {
        alert(err.message);
      });
  }, []);

  const handleBuyButton = (productId) => {
    // Find the product to add
    const product = products.find(item => item.pid === productId);

    if (product) {
      setSelectedItems(prevItems => [...prevItems, product]);
      setItemCount(prevCount => prevCount + 1);
    }
  };

  const handleCheckButton = () => {
    // const root = ReactDOM.createRoot(document.getElementById('root'));
    const { data: customerId } = props;

    const billDataobj = {
      selectedItems,
      customerId
    };
    setBillData(billDataobj);
    setClickedCheckout(true);
    // Assuming you have a Bill component to render
    // root.render(<Bill data={billData} />);
  };

  const getCategoryName = (categoryId) => {
    // Find the category object that matches the given categoryId
    const category = productCategories.find(citem => citem.productId === categoryId);

    // If category is found, return the category name, otherwise return 'Unknown'
    return category ? category.productCatg : 'Unknown';
  };
  if (clickedCheckout) {
    return <Bill data={billData} />
  }

  return (
    <>
      <center>
        <h6>Customer ID: {props.data}</h6>
        <div>
          <img src={Cart} alt="Cart" height={50} width={50} />
          <label htmlFor="">Items: {itemCount}</label>
          <button type='button' onClick={handleCheckButton}>Checkout</button>
        </div>
        <div className='mydiv'>
          {/* <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Offer Price</th>
                <th>Category Name</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.pid}>
                  <td>{item.pid}</td>
                  <td>{item.pname}</td>
                  <td>{item.pprice}</td>
                  <td>{item.oprice}</td>
                  <td>{getCategoryName(item.pcatgid)}</td>
                  <td>
                    <img src={`http://localhost:9679/product/getproductimage/${item.ppicname}`} alt={item.pname} width={100} height={100} />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleBuyButton(item.pid)}>Buy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className='vp-flexbox'>
            {
              products.map((item) => (
                <div class="card" style={{ width: "18rem" }} key={item.pid}>
                  <img src={`http://localhost:9679/product/getproductimage/${item.ppicname}`} alt={item.pname} width={100} height={200} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{item.pname}</h5>
                    <p className="card-text">{item.pid}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">price: {item.oprice}</li>
                    <li className="list-group-item">offer Price : {item.oprice}</li>
                    <li className="list-group-item">Category: {getCategoryName(item.pcatgid)}</li>
                  </ul>
                  <div className="card-body">
                    <button type="button" onClick={() => handleBuyButton(item.pid)}>Buy</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </center>
    </>
  );
}

export default ProductList;
