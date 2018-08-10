import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {User} from "../entity/User"
import path from 'path'

class MainController {

    index(req: Request, res: Response) {
        res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }

    test(req: Request, res: Response) {
        res.json({name: "test", text: "TESTING"});
    }

    async users(req: Request, res: Response) {
        const userRep = getRepository(User)
        let users = await userRep.find()
        res.json(users)
    }
}

export default new MainController()