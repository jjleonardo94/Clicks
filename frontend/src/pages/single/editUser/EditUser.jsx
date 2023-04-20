import "./editUser.scss";
import { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const EditUser = ({ title, data }) => {
  const [file, setFile] = useState("");
  const [datas, setDatas] = useState({});
  const [per, setPerc] = useState(null);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEMail] = useState("");
  const [phone, setPhone] = useState("");
  const [departments, setDepartments] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDatas((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const userDocRef = doc(db, "users", data.id);
    const datas = {
      username,
      displayName,
      email,
      phone,
      departments,
    };
    await updateDoc(userDocRef, datas);
    navigate(-1);
    console.log(datas);
  };

  console.log(data);

  return (
    <div className="users">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : data.photoURL}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <span className="itemKey">Usuario:</span>
                <input
                  className="itemValue"
                  name="username"
                  defaultValue={data.username}
                  onChange={(e) => setUsername(e.target.value, data.id)}
                />
              </div>

              <div className="formInput">
                <span className="itemKey">Nombre Completo:</span>
                <input
                  className="itemValue"
                  name="displayName"
                  defaultValue={data.displayName}
                  onChange={(e) => setDisplayName(e.target.value, data.id)}
                />
              </div>

              <div className="formInput">
                <span className="itemKey">Correo:</span>
                <input
                  className="itemValue"
                  name="email"
                  defaultValue={data.email}
                  onChange={(e) => setEMail(e.target.value, data.id)}
                />
              </div>

              <div className="formInput">
                <span className="itemKey">Teléfono:</span>
                <input
                  className="itemValue"
                  name="phone"
                  defaultValue={data.phone}
                  onChange={(e) => setPhone(e.target.value, data.id)}
                />
              </div>

              <div className="formInput">
                <span className="itemKey">Departamento:</span>
                <input
                  className="itemValue"
                  name="departments"
                  defaultValue={data.departments}
                  onChange={(e) => setDepartments(e.target.value, data.id)}
                />
              </div>
              <button disabled={per !== null && per < 100} type="submit">
                Actualizar
              </button>
              <button onClick={() => navigate(-1)}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
