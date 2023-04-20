import "./datatableClicks.scss";
import { DataGrid } from "@mui/x-data-grid";
import { clickColumns } from "../../../datatablesource";
import { useEffect, useState } from "react";

const DatatableClicks = () => {
  //inicio
  const [tableData, setTableData] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: "c0abd08c0a9a4a4c88c66a1993ebaf68",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.rebrandly.com/v1/links?orderBy=createdAt&orderDir=desc&limit=25",
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  return (
    <div className="datatableClicks">
      <div className="datatableTitle">Clicks</div>
      <DataGrid
        className="datagrid"
        rows={tableData}
        columns={clickColumns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        sx={{
          ".MuiTablePagination-toolbar": {
            color: "gray",
          },
          ".MuiIconButton-colorInherit": {
            color: "gray",
          },
        }}
      />
    </div>
  );
};

export default DatatableClicks;
