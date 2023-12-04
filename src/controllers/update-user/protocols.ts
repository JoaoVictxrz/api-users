import { User } from "../../models/users";
import { HttpRequest, HttpsResponse } from "../protocols";

export interface UpdateUserParams {
  firstName?: String;
  lastName?: String;
  password?: String;
}

export interface IUpdateUserController{
  handle(httpsRequest: HttpRequest<any>): Promise<HttpsResponse<User>>
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

