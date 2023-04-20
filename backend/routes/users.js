const express = require("express");
const {
  getUsers,
  getSingleUser,
  postNewUser,
  deleteUser,
  updateUser,
  logout,
} = require("../controllers/firebase");
const router = express.Router();

//GET all users
router.get("/", getUsers);

//GET a single user
router.get("/:id", getSingleUser);

//POST a new user
router.post("/", postNewUser);

//DELETE a user
router.delete("/:id", deleteUser);

//UPDATE a user
router.patch("/:id", updateUser);

router.post("/:id", logout);

module.exports = router;
