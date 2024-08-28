import React, { useState, useEffect } from "react";
import axios from "axios";

function Bill(props) {
  const [mydata, setMydata] = useState();
  const [custdata, setCustndata] = useState();
  const [cname, setCname] = useState();
  const [caddress, setCaddress] = useState();
  const [ccontect, setCcontect] = useState();
  const [sitems, setSitems] = useState([]);
  var total = 0;
  useEffect(() => {
    for (var i = 0; i < props.data.selitems.length; i++) {
      sitems.push(props.data.selitem[i]);
    }
    sitems.push(props.data.selitems);
    axios.get("http://localhost:9676")
  })

}