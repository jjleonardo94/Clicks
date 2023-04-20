import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./menuProfile.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

//sweetAlert import
import Swal from "sweetalert2";

const MenuProfile = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    Swal.fire({
      title: "Estás seguro de cerrar sesión?",
      icon: "warning",
      iconHtml: "?",
      confirmButtonText: "Cerrar Sesión",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      showCloseButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch({ type: "LOGOUT", payload: null });
      }
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="menuProfile">
      <span className="displayName">{user.displayName}</span>
      <ul className="items">
        <ExitToAppIcon className="icon" />
        <li onClick={handleLogout}>Cerrar Sesión</li>
      </ul>
    </div>
  );
};

export default MenuProfile;
