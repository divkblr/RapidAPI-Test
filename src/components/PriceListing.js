import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";

const TestAxios = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://coinranking1.p.rapidapi.com/coins", {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "7042eb7b0emshc0567c4582d9255p180613jsndc963ccd1008",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data.coins);
      });
  }, []);

  console.log(data);
  const columns = [
    {
      dataField: "symbol",
      text: "Symbol",
      sort: true,
      formatter: (cell, row) => {
        console.log("inside formatter", row);
        return (
          <div
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log("inside selected data", row);
              navigate("/details", { state: { row: row } });
              setIsSelected(true);
              setSelectedData(row);
            }}
          >
            {" "}
            {cell}{" "}
          </div>
        );
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "change",
      text: "Change",
      formatter: (cell, row) => {
        console.log("inside formatter", row);
        return (
          <div>
            {" "}
            {cell > 0 ? (
              <span style={{ color: "green" }}>&#9650; {cell} </span>
            ) : (
              <span style={{ color: "red" }}> &#9660; {cell}</span>
            )}
          </div>
        );
      },
    },
  ];

  if (data.length == 0) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div style={{ width: "80%", margin: "50px" }}>
      <h3>Price Listing</h3>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
       
        pagination={paginationFactory({ sizePerPage: 5 })}
      />
    </div>
  );
};

export default TestAxios;
