import React, { useState } from 'react';
import axios from 'axios';
function StateMgt() {
  const [stname, setStname] = useState('');
  const [slist, setSlist] = useState([]);
  const [stid, setStid] = useState('');
  const [status, setStatus] = useState('');

  const handleStidtextchange = (evt) => {
    setStid(evt.target.value);
  }
  const handleStnametextchange = (evt) => {
    setStname(evt.target.value);
  };

  const handleStatustext = (evt) => {
    setStatus(evt.target.value);
  };

  const handleAddnewButton = () => {
    axios
      .get('http://localhost:9679/state/getall/')
      .then((res) => {
        const newStateId = res.data.length + 1;
        setStid(newStateId);
        setStatus(1);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSaveButton = () => {
    if (stid == "" || stid == undefined || stname == "" || stname == undefined || status == "" || status == undefined) {
      alert("please fill all field");
      return;
    } else {
      axios.get("http://localhost:9679/state/searchbyname/" + stname).then((res) => {
        if (res.data.stname != undefined) {
          alert("status Name already Exist");
        } else {
          let obj = {
            stid: stid,
            stname: stname,
            status: status,
          };
          axios
            .post('http://localhost:9679/state/save/', obj)
            .then((res) => {
              alert(res.data);
              setStid('');
              setStname('');
              setStatus('');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    }

  };
  const handleShowbutton = () => {
    axios.get("http://localhost:9679/state/getall/").then((res) => {
      setSlist(res.data);
      console.log(res.data);

    }).catch((err) => {
      alert(err);
    })
  }
  const handleToggle = (stateId, currentState) => {
    const data = { state: currentState, stid: stateId };

    axios.put("http://localhost:9679/state/toggle", data)
      .then((res) => {
        alert(res.data);
        handleShowbutton();
      })
      .catch((err) => alert(err.response ? err.response.data : err.message));
  };



  const handleSearchbutton = () => {
    if (stid != undefined && stid != "") {
      axios.get("http://localhost:9679/state/search/" + stid).then((res) => {
        // if (res.data.stid != undefined) {
        setStid(res.data.stid);
        setStname(res.data.stname);
        setStatus(res.data.status);
        // } else {
        //   alert("Data Not Found :");
        // }
      }).catch((err) => {
        alert(err);
      })
    }
    if (stname != undefined && stname != "") {
      axios.get("http://localhost:9679/state/searchbyname/" + stname).then((res) => {
        // if (res.data.stid != undefined) {
        setStid(res.data.stid);
        setStname(res.data.stname);
        setStatus(res.data.status);
        // } else {
        //   alert("Data not found : ")
        // }
      }).catch((err) => {
        alert(err);
      })
    }
  }
  const handlleUpdateButton = () => {
    if (!stid || !stname || !status) {
      alert("please fill all field :");
      return;
    } else {
      axios.get('http://localhost:9679/state/searchbyname/' + stname).then((res) => {
        if (res.data.stname !== undefined) {
          alert("data is already exist :");
          return;
        } else {
          const obj = {
            stid: stid,
            stname: stname,
            status: status
          }
          console.log(obj);
          axios.put('http://localhost:9679/state/update', obj).then((res) => {
            alert("data is updated");
            setStid("");
            setStname("");
            setStatus("");
            handleShowbutton();
          }).catch(err => {
            alert(err);
          })
        }
      }).catch((err) => {
        alert(err);
      })


    }
  }
  return (
    <>
      <div className="myDiv">
        <center>
          <h6>State Management</h6>
          <table>
            <tbody>
              <tr>
                <td>State ID:</td>
                <td><input type="text" onChange={handleStidtextchange} className="form-control" value={stid} /></td>
              </tr>
              <tr>
                <td>State Name:</td>
                <td>
                  <input type="text" onChange={handleStnametextchange} className="form-control" value={stname} />
                </td>
              </tr>
              <tr>
                <td>State Status:</td>
                <td>
                  <input type="text" onChange={handleStatustext} className="form-control" value={status} />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="button" onClick={handleAddnewButton} className="btn btn-primary">
                    Add New
                  </button>
                </td>
                <td>
                  <button type="button" onClick={handleSaveButton} className="btn btn-success">
                    Save
                  </button>
                </td>
                <td>
                  <button type="button" onClick={handleShowbutton} className="btn btn-success">
                    Show
                  </button>
                </td>
                <td>
                  <button type="button" onClick={handleSearchbutton} className="btn btn-success">
                    Search
                  </button>

                </td>
                <td><button type="button" onClick={handlleUpdateButton} className="btn btn-success">
                  Update
                </button></td>
              </tr>
            </tbody>
          </table>
          <table className='table-secondary'>
            <tr>
              <th>state ID</th>
              <th>State Name</th>
              <th>Status</th>
            </tr>
            <tbody>
              {slist.map((item) => (
                <tr key={item.stid}>
                  <td className='table-primary'>{item.stid}</td>
                  <td>{item.stname}</td>
                  <td>{item.status === 1 ? "Enable" : "Disable"}</td>
                  <td>
                    <button type="button" onClick={() => handleToggle(item.stid, item.status)} className="btn btn-success">
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>


        </center>
      </div>
    </>
  );
}

export default StateMgt;
