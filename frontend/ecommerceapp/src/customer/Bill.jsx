import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../Images/loginlogo.jpg';

function Bill(props) {
  const [mydate, setDate] = useState('');
  const [custdata, setcustData] = useState();
  const [Cname, setCName] = useState('');
  const [Caddress, setCAddress] = useState('');
  const [CConatct, setCConatct] = useState('');
  const [sitems, setitems] = useState([]);
  let total = 0;

  useEffect(() => {
    // Initialize selected items
    setitems([...props.data.selectedItems]);

    // Fetch customer details
    var cid = props.data.customerId;
    axios
      .get(`http://localhost:9679/customer/getcustomerdeatils/${cid}`)
      .then((res) => {
        setCName(res.data.CustomerName);
        setCAddress(res.data.CAddress);
        setCConatct(res.data.CConatct);
        MydateFun();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data.selitem, props.data.customerId]);

  function MydateFun() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const currentDate = `${day}-${month}-${year}`;
    setDate(currentDate);
  }

  function refreshPage() {
    window.location.reload(false);
  }


  const handleRemoveButton = (pid) => {
    const updatedItems = [...sitems];
    const indexToRemove = updatedItems.findIndex(item => item.pid === pid);
    if (indexToRemove !== -1) {
      updatedItems.splice(indexToRemove, 1);
      setitems(updatedItems);
    }
  }


  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      var amt = total * 100;
      const result = await axios.post(`http://localhost:9679/payment/orders/${amt}`);
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: 'rzp_test_8CxHBNuMQt1Qn8',
        amount: amount.toString(),
        currency: currency,
        name: 'Test',
        description: 'Test',
        image: logo,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            await axios.post('http://localhost:9679/payment/success', data);
            alert('Payment successfully done');
            saveBill();
          } catch (error) {
            alert('Error processing payment');
            console.error(error);
          }
        },
        prefill: {
          name: 'Test',
          email: 'demo@gmail.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
        notes: {
          acno: 7906000100000000000,
          address: "purani gali ke piche",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('Server error. Are you online?');
      console.error(error);
    }
  }
  async function saveBill() {
    try {
      const response = await axios.get('http://localhost:9679/bill/getbillid');
      console.log("Full Response:", response);

      // Check if billid exists
      const billid = response.data.length > 0 ? parseInt(response.data[0]?.billid) + 1 : null;
      if (!billid) {
        console.error("Bill ID is undefined or missing in the response");
        alert("Unable to fetch bill ID");
        return;
      }

      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const currentDate = `${day}-${month}-${year}`;

      sitems.forEach(item => {
        const itemData = {
          billid: billid,
          billdata: currentDate,
          cid: props.data.customerId,
          pid: item.pid
        };

        console.log("Posting item data:", itemData);

        axios.post('http://localhost:9679/bill/billsave', itemData)
          .then(res => {
            console.log("Response for item:", res.data);
          })
          .catch(err => {
            console.error("Error saving item:", err);
          });
      });
    } catch (err) {
      console.error("Error fetching bill ID:", err);
    }
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Customer Id</td>
            <td>{props.data.customerId}</td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>{Cname}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{Caddress}</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>{CConatct}</td>
          </tr>
          <tr>
            <td>Bill Date</td>
            <td>{mydate}</td>
          </tr>
        </tbody>
      </table>
      <center>
        <h4>Bills</h4>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {sitems.map((bill, index) => (
              <tr key={index}>
                <td>{bill.pid}</td>
                <td>{bill.pname}</td>
                <td>{bill.oprice}</td>
                <td>
                  <img
                    src={`http://localhost:9679/product/getproductimage/${bill.ppicname}`}
                    alt={bill.pname}
                    height={50}
                    width={50}
                  />
                </td>
                <td>
                  <button className='btn btn-success' type='button' onClick={() => handleRemoveButton(bill.pid)}>Remove</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        {sitems.forEach((item) => {
          total += item.oprice;
        })}
        <h4>Total Amount = {total}</h4>
        <button type='submit' onClick={displayRazorpay}>Pay Now</button>
      </center>
    </div>
  );
}

export default Bill;
