import { User } from "../../models/users";

export interface IDeleteuserRepository{
    deleteUser(id: string): Promise<User>
}