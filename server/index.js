const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotnev = require("dotenv");
const cors = require("cors");
dotnev.config();
// routes
const userDataRoute = require("./routes/userData");
const sectorRoute = require("./routes/sector");
// environment data
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Done connect"))
  .catch((err) => console.log(err));

// const db = mongoose.connection;

app.use("/api/userData", userDataRoute);
app.use("/api/sectors", sectorRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
