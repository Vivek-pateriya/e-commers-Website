import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  const [pid, setPid] = useState('');
  const [pname, setPName] = useState('');
  const [pprice, setPPrice] = useState('');
  const [oprice, setOPrice] = useState('');
  const [ppicname, setPPicName] = useState('');
  const [pcatgid, setPCatgId] = useState('');
  const [pcatgList, setPCatgList] = useState([]);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState({ preview: "", data: "" });
  const [PList, setPList] = useState([]);

  const handlePidText = (evt) => {
    setPid(evt.target.value);
  };
  const handlePName = (evt) => setPName(evt.target.value);
  const handlePPrice = (evt) => setPPrice(evt.target.value);
  const handleOPrice = (evt) => setOPrice(evt.target.value);
  const handlePCatgSelect = (evt) => setPCatgId(evt.target.value);

  useEffect(() => {
    axios.get('http://localhost:9679/product/getmaxpid')
      .then((res) => {
        setPid(res.data.length + 1);
        console.log("length = " + res.data.length);

      })
      .catch(err => {
        alert(err.message);
      });

    axios.get('http://localhost:9679/productCat/show')
      .then((res) => {
        setPCatgList(res.data);
        // console.log(pcatgList);

      })
      .catch(err => {
        alert(err.message);
      });
  }, []);

  const handleSaveButton = () => {
    if (!pid || !pname || !pcatgid) {
      alert("Please fill all required fields");
      return;
    }

    const obj = {
      pid: pid,
      pname: pname,
      pprice: pprice,
      oprice: oprice,
      ppicname: ppicname,
      pcatgid: pcatgid
    };

    axios.post('http://localhost:9679/product/saveproduct', obj)
      .then((res) => {
        alert(res.data);
        console.log(res.data);
        setPid(pid + 1);
        setPName('');
        setPPrice('');
        setOPrice('');
        setPCatgId('');
        setPPicName('');
        setImage({ preview: "", data: "" });
        handleShowButton();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  const handleShowButton = () => {
    axios.get('http://localhost:9679/product/showproduct')
      .then((res) => {
        setPList(res.data);
        console.log(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    const response = await fetch('http://localhost:9679/product/saveproductimages', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      setStatus('File uploaded successfully');
    } else {
      setStatus('Failed to upload file');
    }
  }

  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0]
    }
    setImage(img);
    setPPicName(evt.target.files[0].name);
  }

  return (
    <>
      <center>
        <h6>Product Form</h6>
        <div className='mydiv'>
          <form>
            <table>
              <tbody>
                <tr>
                  <td>Product Id</td>
                  <td>{pid}</td>
                </tr>
                <tr>
                  <td>Product Name</td>
                  <td>
                    <input
                      type="text"
                      onChange={handlePName}
                      className='form-control'
                      value={pname}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input
                      type="text"
                      onChange={handlePPrice}
                      className='form-control'
                      value={pprice}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Offer Price</td>
                  <td>
                    <input
                      type="text"
                      onChange={handleOPrice}
                      className='form-control'
                      value={oprice}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Select Photo</td>
                  <td>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className='form-control'
                      name="file" />
                    <img src={image.preview} width={100} height={100} alt="Preview" />
                  </td>
                </tr>
                <tr>
                  <td>Click to Upload Product Photo</td>
                  <td>
                    <button type="button" onClick={handleSubmit}>Upload</button>
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>
                    <select onChange={handlePCatgSelect} value={pcatgid}>
                      <option value="" disabled>Select Category</option>
                      {pcatgList.map((item) => (
                        <option value={item.productId} key={item.productId}>{item.productCatg}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type='button'
                      onClick={handleSaveButton}
                      className='btn btn-outline-success'
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
          </form>
        </div>
      </center>
      <center className='Centre2'>
        <h6>Product List</h6>
        <table className='table2'>
          <thead>
            <tr className='tr'>
              <th className='thead'>Product ID</th>
              <th className='thead'>Product Name</th>
              <th className='thead'>Price</th>
              <th className='thead'>Offer Price</th>
              <th className='thead'>Category Name</th>
              <th className='thead'>Photo</th>
            </tr>
          </thead>
          <tbody>
            {PList.map((product, index) => (
              <tr key={index}>
                <td>{product.pid}</td>
                <td>{product.pname}</td>
                <td>{product.pprice}</td>
                <td>{product.oprice}</td>
                <td>
                  {pcatgList.map((item => {
                    if (item.productId === product.pcatgid) {
                      return item.productCatg;
                    }
                  }))}

                </td>
                <td>
                  <img src={`http://localhost:9679/product/getproductimage/${product.ppicname}`} alt="" width={100} height={100} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default Product;
