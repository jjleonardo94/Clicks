const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore, Firestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

//Funciones de Firebase

//GET all users
const getUsers = async (req, res) => {
  const colRef = collection(db, "users");

  const docsSnap = await getDocs(colRef);

  const list = [];
  docsSnap.docs.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return res.json(list);
};

//GET a single user
const getSingleUser = async (req, res) => {
  const colRef = collection(db, "users");
  const docsSnap = await getDocs(colRef);

  const userList = [];
  docsSnap.docs.forEach((doc) => {
    userList.push({ id: doc.id, ...doc.data() });
  });
  //filtering single user
  const User = userList.filter((u) => {
    return u.id === req.params.id;
  });
  res.send(User);
};

//POST a new user
const postNewUser = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    await addDoc(collection(db, "users"), {
      ...data,
    });
    res.send("User has been added successfully");
  } catch (err) {
    console.log(err);
  }
};

//Update a user
const updateUser = async (req, res) => {
  const docRef = doc(db, "users", req.params.id);

  const data = {
    ...req.body,
  };

  console.log(data);

  updateDoc(docRef, data)
    .then((docRef) => {
      console.log("Updated");
      res.json("User has been updated successfully");
    })
    .catch((error) => {
      res.json(error);
    });
};

//Delete a user
const deleteUser = async (req, res) => {
  const docRef = doc(db, "users", req.params.id);

  deleteDoc(docRef)
    .then(() => {
      res.json("User has been deleted successfully");
    })
    .catch((error) => {
      res.json(error);
    });
};

const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out successfully");
};

module.exports = {
  getUsers,
  getSingleUser,
  postNewUser,
  deleteUser,
  updateUser,
  logout,
};
