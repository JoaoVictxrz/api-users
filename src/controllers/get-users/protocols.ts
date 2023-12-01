import { User } from "../../models/users";
import { HttpsResponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<HttpsResponse<User[]>>;
}
export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
