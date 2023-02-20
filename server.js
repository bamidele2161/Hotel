const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");
const router = require("./routes/router");
const error = require("./middleware/error");

dotenv.config({ path: path.resolve(__dirname, "./.env") });
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(morgan("tiny"));

connectDB();
console.log("CHECKING",process.env.SENDGRID_API_KEY);
app.use("/api", router);
app.use(error);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost${PORT}`);
});
