import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { City } from "../entity/City";
import { Street } from "../entity/Street";
import path from "path";

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
}

export default new MainController();
