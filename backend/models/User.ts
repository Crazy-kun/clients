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

    getUsers = (count: number = 25, page: number = 0) => {
        let users = getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.city", "city")
            .leftJoinAndSelect("user.street", "street")
            .limit(count)
            .offset(count * page)
            .getMany();

        return users;
    };

    getUsersCount = () => {
        let count = getRepository(User)
            .createQueryBuilder("user")
            .getCount();

        return count;
    };

    saveUser = async (usr: IUser) => {
        getRepository(User).save(usr);
        return 0;
    };
}

export default new UserModel();
