import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {} //simplificação do metodo abaixo
  // getUserRepository: IGetUsersRepository;
  // constructor(getUserRepository: IGetUsersRepository) {
  //   this.getUserRepository = getUserRepository; //comunicação com banco de dados
  // }
  async handle() {
    try {
      // validar requisição
      // direcionar chamada para o Repository
      const users = await this.getUserRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
