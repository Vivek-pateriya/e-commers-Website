import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function Productmgt() {
  const [productId, setProductId] = useState('');
  const [productCatg, setProductCatg] = useState('');

  const [stPList, setStPList] = useState([]);

  const handleProductCatg = (evt) => setProductCatg(evt.target.value.toUpperCase());
  const handleProductId = (evt) => setProductId(evt.target.value);

  // Fetch state list on component mount
  useEffect(() => {
    axios.get('http://localhost:9679/productCat/show')
      .then((res) => {
        setStPList(res.data);
        console.log(stPList);

      })
      .catch(err => {
        alert(err.message);
      });
  }, []); // Empty dependency array ensures this runs only on mount
  useEffect(() => {
    setProductId(stPList.length + 1);
  }, [stPList]);

  const handleSaveButton = () => {
    if (!productId || !productCatg) {
      alert("Please fill all fields");
      return;
    }

    const obj = { productId, productCatg };
    axios.post('http://localhost:9679/productCat/save', obj)
      .then((res) => {
        alert(res.data);
        console.log(res.data)
        setProductId(stPList.length + 1);
        setProductCatg('');
        handleShowButton();
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleShowButton = () => {
    axios.get('http://localhost:9679/productCat/show')
      .then((res) => {
        setStPList(res.data);
        console.log(res.data)
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <>
      <center>
        <h6>Product category</h6>
        <div className='mydiv'>
          <table>
            <tbody>
              <tr>
                <td>Product Id</td>
                <td>
                  <input
                    type="text"
                    onChange={handleProductId}
                    className='form-control'
                    value={productId}
                  />
                </td>
              </tr>
              <tr>
                <td>Product Name</td>
                <td>
                  <input
                    type="text"
                    onChange={handleProductCatg}
                    className='form-control'
                    value={productCatg}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <button
                    type='button'
                    onClick={handleSaveButton}
                    className='btn btn-outline-secondary'
                  >
                    Save
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    onClick={handleShowButton}
                    className='btn btn-outline-success'
                  >
                    Show
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
      <center className='Centre2'>
        <h6>Product List</h6>
        <table className='table2'>
          <thead>
            <tr className='tr'>
              <th className='thead'>Product ID</th>
              <th className='thead'>Product Name</th>
            </tr>
          </thead>
          <tbody>
            {
              stPList.map((product, index) => (
                <tr key={index}>
                  <td>{product.productId}</td>
                  <td>{product.productCatg}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </center>
    </>
  );
}

export default Productmgt;
