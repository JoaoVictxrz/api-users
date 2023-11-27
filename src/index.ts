const express = require("express");
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/GetUsersController";
import { MongoGetUsersRepository } from "./repositories/getuser/mongo-get-users";
config();
const app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Aberto em ${PORT}`);
});

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});
