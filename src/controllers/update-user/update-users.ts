import { User } from "../../models/users";
import { CreateUserParams } from "../create-user/protocols";
import { HttpRequest, HttpsResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpsRequest: HttpRequest<any>): Promise<HttpsResponse<User>> {
    try {
      const id = httpsRequest?.params?.id;
      const body = httpsRequest?.body;
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }
      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldsIsNotAllowToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );
      if (!someFieldsIsNotAllowToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }
      const user = await this.updateUserRepository.updateUser(id, body);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: " Something went wrong",
      };
    }
  }
}
