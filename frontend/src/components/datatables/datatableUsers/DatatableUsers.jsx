import "./datatableUsers.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

//sweetAlert import
import Swal from "sweetalert2";

const DatatableUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
      return data;
    };
  }, [data]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Estás seguro que desea eliminar este usuario?",
      text: "Esta operacion es irreversible",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: () => {
        const popup = Swal.getPopup();
        popup.classList.remove("swal2-show");
        setTimeout(() => {
          popup.classList.add("animate__animated", "animate__headShake");
        });
        setTimeout(() => {
          popup.classList.remove("animate__animated", "animate__headShake");
        }, 500);
        return false;
      },
    }).then(async (response) => {
      if (response.isConfirmed) {
        try {
          await deleteDoc(doc(db, "users", id));
          setData(data.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={params.row.id.toString()}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatableUsers">
      <div className="datatableTitle">
        Lista de Usuarios
        <Link to="/users/new" className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
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

export default DatatableUsers;
