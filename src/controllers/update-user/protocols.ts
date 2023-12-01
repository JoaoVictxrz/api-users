import { User } from "../../models/users";

export interface UpdateUserParams {
  firstName?: String;
  lastName?: String;
  password?: String;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
