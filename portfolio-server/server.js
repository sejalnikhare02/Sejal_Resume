require("dotenv").config();
const express = require("express");
const dbConfig = require("./src/config/dbConfig");

const app = express();

const portfolioRoute = require("./src/routes/PortfolioRoute");

app.use(express.json());
app.use("/api/portfolio", portfolioRoute);
app.use("/uploads", express.static("uploads"));
// const port = process.env.PORT || 5000;
const port = 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
