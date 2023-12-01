import validator from "validator";
import { User } from "../../models/users";
import { HttpRequest, HttpsResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpsRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpsResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];
      for (const field of requiredFields) {
        if (!httpsRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Fiel ${field} is required`,
          };
        }
      }
      const emailIsValid = validator.isEmail(httpsRequest.body!.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }
      const user = await this.createUserRepository.createUser(
        httpsRequest.body!
      );
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
