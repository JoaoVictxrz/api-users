import { User } from "../../models/users";
import { MongoDeleteUserRepository } from "../../repositories/delete-user/mongo-delete-user";
import { HttpRequest, HttpsResponse } from "../protocols";
import { IDeleteuserController, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteuserController {
  constructor(private readonly deletedUserRepository: IDeleteUserRepository) {}
  async handle(httpsRequest: HttpRequest<any>): Promise<HttpsResponse<User>> {
    try {
      const id = httpsRequest?.params?.id;
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const user = await this.deletedUserRepository.deleteUser(id);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Somenting went wrong",
      };
    }
  }
}
