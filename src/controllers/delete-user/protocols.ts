import { User } from "../../models/users";
import { HttpRequest, HttpsResponse } from "../protocols";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
export interface IDeleteuserController {
  handle(httpsRequest: HttpRequest<any>): Promise<HttpsResponse<User>>;
}
