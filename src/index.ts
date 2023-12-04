const express = require("express");
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/GetUsersController";
import { MongoGetUsersRepository } from "./repositories/get-user/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/update-user";
import { UpdateUserController } from "./controllers/update-user/update-users";

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
  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUsersRepository = new MongoUpdateUserRepository();
    const updateUsersController = new UpdateUserController(
      mongoUpdateUsersRepository
    );

    const { body, statusCode } = await updateUsersController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.listen(PORT, () => console.log(`Aberto em ${PORT}`));
};
main();
