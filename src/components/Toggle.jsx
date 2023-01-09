import React from "react";

function Toggle({ toggle, setToggle }) {

//handle toogle    
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div onClick={handleToggle} className="toggle">
      <div class="toggle-button-cover">
        <div class="button-cover">
          <div class="button b2" id="button-10">
            <input type="checkbox" class="checkbox" />
            <div class="knobs">
              <span>DARK</span>
            </div>
            <div class="layer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toggle;
