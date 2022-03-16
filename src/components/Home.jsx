import { useEffect, useState } from "react";
import "./Home.css";

export const Home = () => {
  const [data, setData] = useState([]);
  let [country,setCountry] = useState(""); 
  const [modalData, setModalData] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://app.callhub.io/international/new/")
      .then((res) => res.json())
      .then((res) => {
        setData(res.supported_countries);
      });
  };

  const handleClick = (e) => {
    console.log("code:", e.code);
    setCountry(e.name);
    fetch(`https://app.callhub.io/pricing/${e.code}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("Country Pricing:", res);
        let mData = groupData(res.rates);
        setModalData(mData);
        console.log("group:", mData);
        setIsVisible(true);
      });
  };
  console.log("ModelData:", modalData);

  const groupData = (data) => {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (obj[data[i].rate]) {
        obj[data[i].rate] = [...obj[data[i].rate], data[i].prefix];
      } else {
        obj[data[i].rate] = [data[i].prefix];
      }
    }
    return obj;
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div id="home_main">
      <h1 id="home_head">Countries and their Codes</h1>
      <p id="home_sec_head">*for more details click on country name</p>
      <table id="home_table">
        <tr>
          <th>Sl. No.</th>
          <th>Country</th>
          <th>Code</th>
        </tr>
        {data.map((e, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              {" "}
              <button className="countryBtn" onClick={() => handleClick(e)}>
                {e.name}
              </button>{" "}
            </td>
            <td>{e.code}</td>
          </tr>
        ))}
      </table>
      {isVisible ? (
        <div id="model">
           <p id="modal_head">{country}</p> 
          <button onClick={handleClose} id="closeBtn">
            close
          </button>
          <table id="modal_table">
            <tr>
              <th>Phone number starts with</th>
              <th>Call cost</th>
            </tr>
            {Object.keys(modalData).map((e, i) => (
              <tr>
                <td>{modalData[e].join(" ")}</td>
                <td className="rate">${e}/min</td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
