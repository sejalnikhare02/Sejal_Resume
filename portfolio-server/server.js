require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConfig = require("./src/config/dbConfig");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

const portfolioRoute = require("./src/routes/PortfolioRoute");

app.use(express.json());
app.use("/api/portfolio", portfolioRoute);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
