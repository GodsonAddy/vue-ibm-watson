const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const watsonRoutes = require("./routes/api/watson.js");
app.use("/api/watson", watsonRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server listening on port", port);
});
