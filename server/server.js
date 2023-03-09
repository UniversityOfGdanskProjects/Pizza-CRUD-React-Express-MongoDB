require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { eventsLogger } = require("./middleware/logger");
const PORT = process.env.PORT || 5000;

const newSamplePizzas = require("./data/newSamplePizzas");
const sampleUsers = require("./data/sampleUsers");

const Pizza = require("./models/Pizza");
const Comment = require("./models/Comment");
const User = require("./models/User");


const app = express();

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("/auth", require("./routes/authRoutes"));

app.use("/pizzas", require("./routes/pizzaRoutes"));

app.use("/info", require("./routes/ReportRouter"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");
  await Pizza.collection.drop();
  await Comment.collection.drop();
  await Promise.all(
    newSamplePizzas.map(async (pizza) => {
      let comments = await Comment.create(pizza.comments);
      pizza.comments = comments.map((comment) => comment._id);
      return Pizza.create(pizza);
    })
  );
  // await User.collection.drop()
  // await Promise.all(
  //   sampleUsers.map(user => User.create(user))
  // )
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  eventsLogger(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
