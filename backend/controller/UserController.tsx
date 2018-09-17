import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import UserModel from "../models/User";
import RabbitMQ from "../amqp/index";

class UserController {
    async users(req: Request, res: Response) {
        let users = await UserModel.getUsers();

        let date = new Date();
        let dateStr =
            "[" +
            date.getFullYear() +
            "." +
            date.getMonth() +
            "." +
            date.getDay() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds() +
            "] ";
        let msg = dateStr + "users was loaded";
        RabbitMQ.sendMessageAdv(msg, "logs", "clients.logs.info");

        res.json(users);
    }

    saveUsers(req: Request, res: Response) {
        const clients = req.body.users;
        const userRep = getRepository(User);

        clients.map((client: User) => {
            userRep.save(client);
        });

        let date = new Date();
        let dateStr =
            "[" +
            date.getFullYear() +
            "." +
            date.getMonth() +
            "." +
            date.getDay() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds() +
            "] ";
        let msg = dateStr + "users was saved";
        RabbitMQ.sendMessageAdv(msg, "logs", "clients.logs.warn");

        res.send(true);
    }
}

export default new UserController();
