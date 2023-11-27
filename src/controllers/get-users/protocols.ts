import { User } from "../../models/users";

export interface IGetUsersController {
  handle(): Promise<HttpsResponse<User[]>>;
}
export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
