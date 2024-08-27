import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function Citymgt() {
  const [ctid, setCtid] = useState('');
  const [ctname, setctName] = useState('');
  const [stid, setStid] = useState('');
  const [status, setStatus] = useState('');
  const [stList, setStList] = useState([]);
  const [ctlist, setCtList] = useState([]);

  const handlectid = (evt) => {
    setCtid(evt.target.value);
  }

  const handlectname = (evt) => {
    setctName(evt.target.value);
  }
  const handleStIdSelect = (evt) => {
    setStid(evt.target.value);
  }
  const handlestatus = (evt) => {
    setStatus(evt.target.value);
  }

  /* handle page load event or this function will execute automatically at tha loading time of component */

  useEffect(() => {
    axios.get('http://localhost:9679/state/show')
      .then((res) => {
        setStList(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  }, []); // Empty dependency array ensures this runs only on mount

  const handleAddnewButton = () => {
    axios.get("http://localhost:9679/city/getall").then((res) => {
      setCtid(res.data.length + 1);
      setStatus(1);
    }).catch((err) => {
      alert(err.message);
    })
  }
  const handleSaveButton = () => {
    if (ctid === "" || ctid === undefined || ctname === "" || ctname === undefined || stid === "" || stid === undefined || status === '0') {
      alert("Please fill all the fields");
      return;
    } else {
      var obj = {
        "ctid": ctid,
        "ctname": ctname,
        "stid": stid,
        "status": status
      }
      axios.post("http://localhost:9679/city/save", obj).then((res) => {
        alert(res.data, "Data saved successfully");
        setCtid("");
        setctName("");
        setStid("");
        setStatus("");
      }).catch((err) => {
        alert(err.message);
      });
    }
  }
  const handleShowButton = () => {
    axios.get("http://localhost:9679/city/getall").then((res) => {
      setCtList(res.data);
    }).catch((err) => {
      alert(err.message);
    });
  }
  const handleSearchButton = () => {
    if (ctid != undefined && ctid != "") {
      axios.get("http://localhost:9679/city/search/" + ctid).then((res) => {
        if (res.data.stid != undefined) {
          setCtid(res.data.ctid);
          setctName(res.data.ctname);
          setStid(res.data.stid);
          setStatus(res.data.status);
        } else {
          alert("No data found");
        }
      }).catch((err) => {
        alert(err.message);
      });
    }
    if (ctname !== undefined && ctname != "") {
      axios.get("http://localhost:9679/city/searchbyname/" + ctname).then((res) => {
        if (res.data.stid != undefined) {
          setCtid(res.data.ctid);
          setctName(res.data.ctname);
          setStid(res.data.stid);
          setStatus(res.data.status);
        } else {
          alert("No data found");
        }
      })
    }
  }
  const handleUpdateButton = () => {
    if (stid === "" || stid === undefined || ctname === undefined || status === "" || status === undefined) {
      alert("Please fill all fields");
      return;
    } else {
      var obj = {
        ctid: ctid,
        ctname: ctname,
        stid: stid,
        status: status
      };
      console.log(obj);

      axios.put("http://localhost:9679/city/update/", obj).then((res) => {
        alert(res.data);
        setCtid("");
        setctName("");
        setStid("");
        setStatus("");
      }).catch((err) => {
        alert(err.message);
      })
    }
  }
  const handleDeleteButton = () => {
    if (ctid !== undefined && ctid != "") {
      axios.delete("http://localhost:9679/city/delete/" + ctid).then((res) => {
        alert(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    } else {
      alert("Fill State id to delete : ");
    }
  }

  const handleToggle = (cityId, currentState) => {
    const data = { ctid: cityId, state: currentState };

    axios.put("http://localhost:9679/city/toggle", data)
      .then((res) => {
        alert(res.data);
        handleShowButton(); // Refresh city list
      })
      .catch((err) => alert(err.response ? err.response.data : err.message));
  };

  return (
    <>
      <center>
        <h2>City Management</h2>
        <div className="form-container">
          <table className="form-table">
            <tbody>
              <tr>
                <td>City ID</td>
                <td>
                  <input
                    type="text"
                    onChange={handlectid}
                    className="form-control"
                    value={ctid}
                  />
                </td>
              </tr>
              <tr>
                <td>City Name</td>
                <td>
                  <input
                    type="text"
                    onChange={handlectname}
                    className="form-control"
                    value={ctname}
                  />
                </td>
              </tr>
              <tr>
                <td>State Name</td>
                <td>
                  <select
                    className="form-control"
                    value={stid}
                    onChange={handleStIdSelect}
                  >
                    <option value="" disabled>Select state</option>
                    {stList.map((item) => (
                      <option key={item.stid} value={item.stid}>
                        {item.stname}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  <input
                    type="number"
                    value={status}
                    onChange={handlestatus}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="button-row">
                  <button
                    type="button"
                    onClick={handleAddnewButton}
                    className="btn btn-outline-primary"
                  >
                    Add New ID
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveButton}
                    className="btn btn-outline-secondary"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleShowButton}
                    className="btn btn-outline-success"
                  >
                    Show
                  </button>
                  <button
                    type="button"
                    onClick={handleSearchButton}
                    className="btn btn-outline-danger"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateButton}
                    className="btn btn-outline-info"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteButton}
                    className="btn btn-outline-warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
      <center>
        <h2>City List</h2>
        <div className="list-container">
          <table className="list-table">
            <thead>
              <tr>
                <th>City ID</th>
                <th>City Name</th>
                <th>State ID</th>
                <th>State Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              {

                ctlist.map((item) => (

                  < tr  >
                    <td>{item.ctid}</td>
                    <td>{item.ctname}</td>
                    <td>{item.stid}</td>
                    {stList.map((i) => {
                      if (i.stid === item.stid) {
                        return <td>{i.stname}</td>
                      }
                    })}

                    <td>
                      <button
                        className="btn btn-outline-warning"
                        type="button"
                        onClick={() => handleToggle(item.ctid, item.status)}
                      >
                        {item.status === 1 ? 'Enabled' : 'Disabled'}
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </center >
    </>
  );


}

export default Citymgt;