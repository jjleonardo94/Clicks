import React, { useState } from "react";
import "./singleUser.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useLoaderData, useParams } from "react-router-dom";
import EditUser from "../editUser/EditUser";
import { useNavigate } from "react-router-dom";

const SingleUser = () => {
  const [updateState, setUpdateState] = useState(-1);
  const { id } = useParams();
  const datas = useLoaderData();

  const navigate = useNavigate();

  const editData = (id) => {
    setUpdateState(id);
    // navigate("/users/edit");
  };

  console.log(datas);

  return (
    <div className="singleUser">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          {datas.map((data) =>
            updateState === data.id ? (
              <EditUser data={data} />
            ) : (
              <div className="left" key={data.id}>
                <div className="editButton" onClick={() => editData(data.id)}>
                  Edit
                </div>
                <h1 className="title">Información</h1>
                <div className="item" key={data.id}>
                  <img src={data.photoURL} alt="" className="itemImg" />
                  <div className="details">
                    <h1 className="itemTitle">{data.displayName}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Usuario:</span>
                      <span className="itemValue">{data.username}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Correo:</span>
                      <span className="itemValue">{data.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Teléfono:</span>
                      <span className="itemValue">{data.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Departamento:</span>
                      <span className="itemValue">{data.departments}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

//loader function
export const userDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:4000/api/users/" + id);

  return res.json();
};
