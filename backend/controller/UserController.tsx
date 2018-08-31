import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import UserModel from "../models/User";

class UserController {
    async users(req: Request, res: Response) {
        let users = await UserModel.getUsers();
        res.json(users);
    }

    saveUsers(req: Request, res: Response) {
        const clients = req.body.users;
        const userRep = getRepository(User);

        clients.map((client: User) => {
            userRep.save(client);
        });

        res.send(true);
    }
}

export default new UserController();
