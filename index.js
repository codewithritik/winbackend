import express from "express";
import mongoose from "mongoose";
// import {app} from "./app";
// var cors = require('cors')
import cors from "cors"; 
const app = express();
app.use(cors())

app.use(express.json());

mongoose.connect(`mongodb+srv://ritikadvice:ESdqydSkDtGc8Gos@cluster0.q67ewwy.mongodb.net/?retryWrites=true&w=majority
`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
});

import userModel from "./modal.js";
app.get("/", async (request, response) => {
  try {
    response.send("working fine");
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/add_user", async (request, response) => {
  const user = new userModel(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  try {
    const users = await userModel.find({});
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(8080, () => {
  console.log("Server is running at port 8000");
});
