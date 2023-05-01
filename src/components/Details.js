import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const TableDetail = ({ selectedData }) => {
    const {state} = useLocation();
    const navigate = useNavigate();
  console.log("selected datas", state);
  return (
    <div style={{width:"50%", margin:"50px"}}>
      <h3>Details</h3>
      <table class="table table-bordered">
        <tr>
          <td><div><h6>Symbol</h6>{state.row.symbol}</div></td>
          <td><div><h6>Name</h6>{state.row.name}</div></td>
        </tr>
        <tr>
          <td><div><h6>Price(USD)</h6>{state.row.price}</div></td>
          <td>
            <div><h6>Change</h6>
          {
             state.row.change>0 ? <span style={{color:"green"}}>&#9650; {state.row.change} </span>:<span style={{color:"red"}}> &#9660; {state.row.change}</span>
          }
          </div>
          </td>
        </tr>
        <tr>
          <td><div><h6>Market Cap(USD)</h6>{state.row.marketCap}</div></td>
          <td><div><h6>Rank</h6>{state.row.rank}</div></td>
        </tr>
        <tr>
          <td><div><h6>24 Hour Volume</h6>{state.row['24hVolume']}</div></td>
        </tr>

      </table>
      <button type="button" class="btn btn-success" onClick={()=>navigate("/")}>Back to List</button>


    </div>
  );
};

export default TableDetail;
