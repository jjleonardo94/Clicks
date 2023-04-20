import React, { forwardRef } from "react";
import withClickOutside from "../clickOutSide/withClickOutside";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

//DarkMode imports
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import MenuProfile from "../menuProfile/MenuProfile";

const Navbar = forwardRef(({ open, setOpen }, ref) => {
  const { dispatchs } = useContext(DarkModeContext);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatchs({ type: "TOGGLE" })}
            />
          </div>
          <section ref={ref}>
            <div className="item">
              <img
                src={user.photoURL || "/img/noavatar.png"}
                alt=""
                className="avatar"
                onClick={() => setOpen(!open)}
              />
              {open && <MenuProfile />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

export default withClickOutside(Navbar);
