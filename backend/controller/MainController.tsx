import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {User} from "../entity/User"
import path from 'path'

class MainController {

    index(req: Request, res: Response) {
        res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
    }

    test(req: Request, res: Response) {
        // res.json({name: "test", text: "TESTING"});
        const userRep = getRepository(User)
        let user = new User
        user.name = 'Peter Smith'
        user.username = 'ps'
        user.email = 'speter@mail.com'
        user.phone = '9874748736'
        userRep.save(user)
        res.send(`User ${user.name} created.`)
    }

    async users(req: Request, res: Response) {
        const userRep = getRepository(User)
        let users = await userRep.find()
        res.json(users)
    }

    saveUsers(req: Request, res: Response) {
        const clients = req.body.users
        const userRep = getRepository(User)

        clients.map((client: User) => {
            userRep.save(client)
        })

        res.send(true)
    }
}

export default new MainController()