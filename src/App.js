import React, {useState } from "react";

import backimage from "./images/bg_img.png";
import Form from "./components/Form";
import Toggle from "./components/Toggle";

import "./App.css";

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className={toggle ? "main_div_light_mode" : "main_div_dark_mode"}>
        <Toggle toggle={toggle} setToggle={setToggle} />
        <div>
          <h4>BLACK MONTHLY EXIBIT "FEB 2023</h4>
          <img src={backimage} alt="img" width={300} />
        </div>
        <div>
          <h5>Sign up for monthly newsletter</h5>
          <Form />
        </div>
      </div>
    </>
  );
}

export default App;
