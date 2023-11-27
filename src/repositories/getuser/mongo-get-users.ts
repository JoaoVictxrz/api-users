import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "lucas",
        lastName: "Batista",
        email: "lucasbatista@email.com",
        password: "1324687",
      },
    ];
  }
}
