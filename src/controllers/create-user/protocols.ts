import { User } from "../../models/users";
import { HttpRequest, HttpsResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    httpsRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpsResponse<User>>;
}

export interface CreateUserParams {
  firstName: String;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
