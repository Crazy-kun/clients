import { User } from "../entity/User";
import { getRepository } from "typeorm";

export interface IUser {
    id?: number;
    name?: string;
}

class UserModel {
    getUser = (usr: IUser) => {
        let user = getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.city", "city")
            .leftJoinAndSelect("user.street", "street")
            .where("user.id = :id", { id: usr.id })
            .getOne();
        return user;
    };

    getUsers = () => {
        let users = getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.city", "city")
            .leftJoinAndSelect("user.street", "street")
            .getMany();
        return users;
    };

    saveUser = async (usr: IUser) => {
        getRepository(User).save(usr);
        return 0;
    };
}

export default new UserModel();
