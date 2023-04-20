import { useContext, useState } from "react";
import "./style/dark.scss";
import Login from "./pages/login/Login";
import ListUsers from "./pages/list/listUsers/ListUsers";
import ListClick from "./pages/list/listClick/ListClick";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import Users from "./pages/users/Users";
import { EditUserInputs, userInputs } from "./formSource";
import SingleUser, {
  userDetailsLoader,
} from "./pages/single/singleUser/SingleUser";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import EditUser from "./pages/single/editUser/EditUser";
//**************************************************************************** */

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import app from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firestore = getFirestore(app);
//**************************************************************************** */

const App = () => {
  const [user, setUser] = useState();
  //**************************************************************************** */

  async function getRol(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const FinalInfo = docuCifrada.data().role;
    return FinalInfo;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((role) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        role: role,
      };
      setUser(userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });
  //**************************************************************************** */

  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route
          index
          element={
            <RequireAuth>
              <ListUsers />
            </RequireAuth>
          }
        />

        <Route path="/users">
          <Route
            index
            element={
              <RequireAuth>
                <ListUsers />
              </RequireAuth>
            }
          />
          <Route
            path=":id"
            element={
              <RequireAuth>
                <SingleUser />
              </RequireAuth>
            }
            loader={userDetailsLoader}
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <Users inputs={userInputs} title="Agregar Nuevo Usuario" />
              </RequireAuth>
            }
          />
          <Route
            path="edit"
            element={
              <RequireAuth>
                <EditUser inputs={EditUserInputs} title="Editar Usuario" />
              </RequireAuth>
            }
          />
        </Route>

        {/* Clicks Route */}
        <Route path="clicks">
          <Route
            index
            element={
              <RequireAuth>
                <ListClick />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
