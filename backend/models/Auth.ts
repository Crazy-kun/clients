import { Auth } from "../entity/Auth";
import { getRepository } from "typeorm";
import md5 from "md5";

export interface IUser {
    id?: number;
    username?: string;
    password?: string;
}

class AuthModel {
    getUser = (usr: IUser) => {
        let user = getRepository(Auth)
            .createQueryBuilder("user")
            .where("user.id = :id", { id: usr.id })
            .getOne();
        return user;
    };

    checkAuth = async (username: string, pswd: string) => {
        let user = await getRepository(Auth)
            .createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOne();

        if (user) {
            if (user.password === md5(pswd)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
}

export default new AuthModel();
