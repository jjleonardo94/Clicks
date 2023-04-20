import React, { useContext, useState } from "react";
import "./login.scss";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  AiOutlineUser,
  AiFillLock,
  AiOutlineRight,
  AiOutlineUnlock,
} from "react-icons/ai";

//notifications imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//notifications variable
const notify = () => {
  toast.info("Link enviado a su correo electrónico", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const ErrorNotification = () => {
  toast.error("Correo no encontrado", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathnname || "/users";

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate(from, "/users", { replace: true });
        navigate(0);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const forgotPasswordHandler = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      notify();
    } catch (error) {
      ErrorNotification();
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <img src="/img/marti-logo.png" alt="" className="logo" />
          <form className="login" onSubmit={handleLogin}>
            <div className="login__field">
              <i className="login__icon fas fa-user">
                <AiOutlineUser />
              </i>
              <input
                type="text"
                className="login__input"
                placeholder="Usuario"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock">
                <AiFillLock />
              </i>
              <input
                type="password"
                className="login__input"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Iniciar Sesion</span>
              <i className="button__icon fas fa-chevron-right">
                <AiOutlineRight />
              </i>
            </button>
            {error && (
              <span className="error">Correo o Contraseña Incorrecta!</span>
            )}
            <div className="button resetPassword">
              <span className="button__text" onClick={forgotPasswordHandler}>
                Forgot Password?
              </span>
              <i className="button__iconResetPSW fas fa-chevron-right">
                <AiOutlineUnlock />
              </i>
            </div>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
      <ToastContainer
        position="center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Login;
