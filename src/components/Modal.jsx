import { useEffect, useState } from "react";
import "./Modal.css";

export const Modal = ({ countryCode, setIsVisible }) => {
  const [country, setCountry] = useState("");
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    getData(countryCode);
  }, [countryCode]);

  const getData = (countryCode) => {
    fetch(`https://app.callhub.io/pricing/${countryCode}`)
      .then((res) => res.json())
      .then((res) => {
        setCountry(res.country_name);
        setIsVisible(true);

        console.log("Country Pricing:", res);

        let mData = groupData(res.rates);
        console.log("group:", mData);
        setModalData(mData);
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
  );
};
