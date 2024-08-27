import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom/client'
import '../index.css';

function CustomerReg() {
  const [CUSerId, setCUserID] = useState("");
  const [CUserPass, setCUserPass] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [StId, setStId] = useState("");
  const [CtId, setCtId] = useState("");
  const [CAddress, setCAddress] = useState("");
  const [CEmail, setCEmail] = useState("");
  const [CConatct, setCConatct] = useState("");
  const [CPicName, setCPicName] = useState("");
  const [Cid, setCid] = useState("");
  const [status, setstatus] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [stList, setstList] = useState([]);
  const [ctList, setctList] = useState([]);

  const handleCUSerId = (evt) => {
    setCUserID(evt.target.value);
  }
  const handleUserP = (evt) => {
    setCUserPass(evt.target.value);
  }
  const handlecustomerName = (evt) => {
    setCustomerName(evt.target.value);
  }
  const handleStIdSelect = (evt) => {
    setStId(evt.target.value);
    axios.get('http://localhost:9679/city/showcitybystate' + evt.target.value).then((res) => {
      setctList(res.data);
    })
  }
  const handleCtIdSelect = (evt) => {
    setCtId(evt.target.value);
  }
  const handleCAddress = (evt) => {
    setCAddress(evt.target.value);
  }
  const handleCEmail = (evt) => {
    setCEmail(evt.target.value);
  }
  const handleCConatct = (evt) => {
    setCConatct(evt.target.value);
  }

  const handlePicName = (evt) => {
    setCPicName(evt.target.value);
  }
  useEffect(() => {
    axios.get('http://localhost:9679/customer/getcustomercount').then((res) => {
      setCid(res.data.length + 1);
    }).catch(err => {
      console.log(err);
    })
    axios.get('http://localhost:9679/state/show').then((res) => {
      setstList(res.data);
    }).catch(err => {
      console.log(err);
    })

  }, [])
  const handleRegsistration = () => {
    var obj = {
      CUSerId: CUSerId,
      CUserPass: CUserPass,
      CustomerName: CustomerName,
      StId: StId,
      CtId: CtId,
      CAddress: CAddress,
      CEmail: CEmail,
      CConatct: CConatct,
      CPicName: CPicName,
      Cid: Cid

    }
    axios.post('http://localhost:9679/customer/regsiter', obj).then(res => {
      console.log(res.data);

    }).catch(err => {
      console.log(err);
    })


  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('file', image.data);
    const res = await fetch('http://localhost:9679/customer/savecustomerimage', {
      method: 'POST',
      body: formData
    });
    if (res) {
      if (res.statusText === 'ok') {
        setstatus('FIle uploads succsefully')
        console.log('upload succfully')
      }
      else {
        setstatus('FIle uploads failed')
      }
    }
  };

  const handleChange = (evt) => {
    const selectedFile = evt.target.files[0];
    const imageURL = URL.createObjectURL(selectedFile);
    setImage({ preview: imageURL, data: selectedFile });
    setCPicName(evt.target.files[0].name);
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <table>
        <tbody>
          <tr>
            <td>Customer ID:</td>
            <td>{Cid}</td>
          </tr>
          <tr>
            <td>UserId</td>
            <td><input type="text" value={CUSerId} onChange={handleCUSerId} /></td>
          </tr>
          <tr>
            <td>Password</td>
            <td><input type="password" value={CUserPass} onChange={handleUserP} /></td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td><input type="text" value={CustomerName} onChange={handlecustomerName} /></td>
          </tr>
          <tr>
            <td>State</td>
            <td>
              <select value={StId} onChange={handleStIdSelect}>
                {
                  stList.map((state, index) => (
                    <option key={index} value={state.stid}>{state.stname}</option>
                  ))
                }

              </select>
            </td>
          </tr>
          <tr>
            <td>City</td>
            <td>
              <select value={CtId} onChange={handleCtIdSelect}>
                {
                  ctList.map((city, index) => (
                    <option key={index} value={city.ctid}>{city.ctname}</option>
                  ))
                }
              </select>
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input type="text" onChange={handleCAddress} />
            </td>
          </tr>
          <tr>
            <td>
              Email
            </td>
            <td>
              <input type="text" onChange={handleCEmail} />
            </td>

          </tr>
          <tr>
            <td>
              Phone
            </td>
            <td>
              <input type="text" onChange={handleCConatct} />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              {image.preview && <img src={image.preview} alt="preview" width={100} height={100} />}
              <input type="file" onChange={handleChange} name="file" />
            </td>
          </tr>
          <tr>
            <td><button type="submit" onClick={handleSubmit} className='btn btn-primary'>Uploads</button></td>
            <td colSpan="2">
              <button type="submit" onClick={handleRegsistration} className='btn btn-primary'>Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );

}
export default CustomerReg;