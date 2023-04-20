import * as moment from "moment";

//Clicks Columns
export const clickColumns = [
  {
    field: "clicks",
    headerName: "Clicks",
    width: 120,
  },
  {
    field: "shortUrl",
    headerName: "Url",
    width: 180,
  },
  {
    field: "createdAt",
    valueFormatter: (params) => moment(params?.value).format("MM/DD/YYYY"),
    headerName: "Fecha",
    width: 250,
  },
  {
    field: "lastClickAt",
    valueFormatter: (params) => moment(params?.value).format("MM/DD/YYYY"),
    headerName: "Fecha ultimo click",
    width: 250,
  },
  {
    field: "",
    valueGetter: (params) => {
      return params.row.creator.fullName;
    },
    headerName: "Clickeado por",
    width: 200,
  },
];

//Users Columns
export const userColumns = [
  { field: "id", headerName: "ID", width: 85 },
  {
    field: "user",
    headerName: "Usuario",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photoURL} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "displayName",
    headerName: "Nombre Completo",
    width: 200,
  },
  {
    field: "email",
    headerName: "Correo",
    width: 230,
  },
  {
    field: "departments",
    headerName: "Departamentos",
    width: 180,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
];
