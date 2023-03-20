const express = require('express');
const cors = require("cors")

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 4000;

//config
dotenv.config({path:"config/.env"});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connecting to database
connectDatabase();


// Routes
const count = require("./routes/insightsRoutes");
app.use("/api/v1",count);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
