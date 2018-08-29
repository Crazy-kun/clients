import {Request, Response} from 'express'
import MainController from './controller/MainController'
import express from 'express'

const router = express.Router();

router.get('/', function(req: Request, res: Response) {
    MainController.index(req, res)
})

router.get('/users', function(req: Request, res: Response) {
    MainController.users(req, res)
})

router.get('/test', function(req: Request, res: Response) {
    MainController.test(req, res)
})

router.post('/saveusers', function(req: Request, res: Response) {
    MainController.saveUsers(req, res)
})

export default router