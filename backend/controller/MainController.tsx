import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { City } from "../entity/City";
import { Street } from "../entity/Street";
import path from "path";
import RabbitMQ from "../amqp/index";

class MainController {
    index(req: Request, res: Response) {
        res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
    }
    async cities(req: Request, res: Response) {
        let cities = await getRepository(City).find();
        res.json(cities);
    }

    async streets(req: Request, res: Response) {
        let streets = await getRepository(Street).find();
        res.json(streets);
    }

    rabbit(req: Request, res: Response) {
        let msg = req.body.msg;
        RabbitMQ.sendMessageAdv(msg, 'logs', 'clients.logs.info')
        res.json("Sent");
    }
}

export default new MainController();
