const express = require("express");
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/GetUsersController";
import { MongoGetUsersRepository } from "./repositories/getuser/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();
  await MongoClient.conect();
  const PORT = process.env.PORT || 3030;

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });
  app.listen(PORT, () => console.log(`Aberto em ${PORT}`));
};
main();
