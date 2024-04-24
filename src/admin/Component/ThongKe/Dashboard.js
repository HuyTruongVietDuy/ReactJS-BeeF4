import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import CountTotal from './Total'
import DashBoardLeft from './DashBoardLeft'
import DashBoardRight from './DashBoardRight'
const DashBoard = () => {
  
  return (
    <div id="container-main-admin">
      <div id="container-nav-admin">
        <div className="nav-left-admin">
          <h1> DashBoard Admin</h1>
        </div>
        <div className="nav-right-admin">
          {/* <button> Thêm mới </button> */}
        </div>
      </div>
      <div className="admin-content-component">
      <CountTotal/>
      <div className="dasboard-container">
      <DashBoardLeft/>
      <DashBoardRight/>
      </div>
     
       
      </div>
    </div>
  );
};

export default DashBoard;
