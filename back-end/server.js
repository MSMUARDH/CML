require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const organizationalRoutes = require("./Routes/organizationRoutes");
const settingRoutes = require("./Routes/settingsRoute");
const locationRoutes = require("./Routes/locationDetailRoutes");
const commentRoutes = require("./Routes/commentRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/organization", organizationalRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/comments", commentRoutes);



const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://msmuaz:muaz1234@cluster0.3hjsxbq.mongodb.net/")
  .then(() =>
    app.listen(port, () => {
      console.log("MongoDB Atlas connected success....");
      console.log(`app is listening on port ${port}.....`);
    })
  )
  .catch((err) => console.error("Could not connect to MongoDB", err.message));
