require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/users");

//Express App
const app = express();

//Cors
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.options("/api/users", cors());
app.use(cors(corsOptions));

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/users", userRoutes);

//Listen for resquest
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
