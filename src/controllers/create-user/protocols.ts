import { User } from "../../models/users";

export interface CreateUserParams {
  firstName: String;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
