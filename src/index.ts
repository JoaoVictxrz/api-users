const express = require("express");
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/GetUsersController";
import { MongoGetUsersRepository } from "./repositories/getuser/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  await MongoClient.conect();
  const PORT = process.env.PORT || 3030;

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });
  app.post("/users", async (req, res) => {
    const mongoCreateUsersRepository = new MongoCreateUserRepository();
    const createUsersController = new CreateUserController(
      mongoCreateUsersRepository
    );

    const { body, statusCode } = await createUsersController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.listen(PORT, () => console.log(`Aberto em ${PORT}`));
};
main();
