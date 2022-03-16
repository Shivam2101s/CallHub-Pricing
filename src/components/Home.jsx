import { useEffect, useState } from "react";
import "./Home.css";
import {Modal} from "./Modal"

export const Home = () => {
  const [data, setData] = useState([]);
  const [countryCode,setCountryCode] = useState("");
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

 const handleClick =(e) => {
   setCountryCode(e.code)
   setIsVisible(true);
 }


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
        <Modal countryCode={countryCode} setIsVisible={setIsVisible} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
