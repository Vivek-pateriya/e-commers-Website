import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BillBYId(props) {
  const [billid, setBillId] = useState([]);
  const [billDetails, setBillDetails] = useState([]);
  const [plist, setPLIst] = useState([]);
  const [selectedBillId, setSelectedBillId] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:9679/bill/billsshow/' + props.data)
      .then(res => {
        console.log(res.data);
        console.log(res.data[0].billid);
        res.data.map((item) => (
          billid.push(item.billid)
        ))

        // for (let i = 0; i < res.data.length; i++) {
        //   setBillId([...res.data.billid, billid]);
        // }
        if (res.data.billid && Array.isArray(res.data.billid)) {
          setBillId(res.data); // Set the array of bill IDs
        } else {
          console.error("Unexpected response format for bill IDs");
        } // Assuming res.data is an array [...props.data.selectedItems]like [1000]
        // alert(billid);
        // console.log("data =" + res.data + "\nbillid = " + billid.length);
        console.log(billid);


      })
      .catch(err => {
        console.log(err);
      });

    axios.get('http://localhost:9679/product/showproduct/')
      .then(res => {
        setPLIst(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, [props.data]);

  useEffect(() => {
    if (selectedBillId) {
      axios.get('http://localhost:9679/bill/showbillbyid/' + selectedBillId)
        .then(res => {
          setBillDetails(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedBillId]);

  useEffect(() => {
    let calculatedTotal = 0;
    billDetails.forEach(item => {
      const product = plist.find(pitem => item.pid === pitem.pid);
      if (product) {
        calculatedTotal += product.oprice;
      }
    });
    setTotal(calculatedTotal);
  }, [billDetails, plist]);

  const handleBillSelect = (evt) => {
    setSelectedBillId(evt.target.value);
  };
  const productMap = plist.reduce((map, product) => {
    map[product.pid] = product;
    return map;
  }, {});


  return (
    <div>
      <center>
        <p>CustomerID {props.id}</p>
        <table>
          <tbody>
            <tr>
              <td>Bill ID</td>
              <td>
                <select onChange={handleBillSelect} value={selectedBillId}>
                  <option value="">Select Id</option>
                  {billid.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Customer ID</th>
              <th>Bill Date</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Image</th>
            </tr>
          </thead>
          <tbody>
            {billDetails.map((item, index) => {
              const product = productMap[item.pid];
              return (
                <tr key={index + 100}>
                  <td>{item.billid}</td> {/* Make sure you are accessing the correct property */}
                  <td>{item.cid}</td>
                  <td>{item.billdata}</td>
                  <td>{product ? product.pname : 'Unknown'}</td> {/* Access pname properly */}
                  <td>{product ? product.oprice : 'N/A'}</td> {/* Access oprice properly */}
                  <td>
                    {product ? (
                      <img
                        src={"http://localhost:9679/product/getproductimage/" + product.ppicname}
                        alt="Product Image"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>Total: {total}</div>
      </center>
    </div>
  );
}

export default BillBYId;