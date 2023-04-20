import "./sidebar.scss";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import logo from "../assets/img/marti-logo.png";

//sweetAlert import
import Swal from "sweetalert2";

function Sidebar() {
  const { dispatchs } = useContext(DarkModeContext);

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

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/users" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src={logo} alt="" />
          </span>
        </Link>
      </div>

      <hr />

      <div className="links">
        <ul>
          <p className="title">Menú Principal</p>

          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleOutlineIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>

          <p className="title">Información</p>
          <Link to="/clicks" style={{ textDecoration: "none" }}>
            <li>
              <LinkIcon className="icon" />
              <span>Clicks</span>
            </li>
          </Link>

          <Link onClick={handleLogout} style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Cerrar Sesión</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatchs({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatchs({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
}

export default Sidebar;
