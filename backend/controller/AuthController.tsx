import { Request, Response } from "express";
import AuthModel from "../models/Auth";

class AuthController {
    async auth(req: Request, res: Response) {
        let resp = await AuthModel.checkAuth(
            req.body.username,
            req.body.password
        );
        if (resp) {
            if (req.session) {
                req.session.username = req.body.username;
            }
        }
        res.json(resp);
    }

    async logout(req: Request, res: Response) {
        if (req.session) {
            req.session.username = "";
        }
        res.json(true);
    }

    async checkAuth(req: Request, res: Response) {
        let check: boolean = false;
        let username: string = "";
        if (req.session) {
            if (req.session.username) {
                username = req.session.username;
                check = true;
            }
        }
        res.json({ check: check, username: username });
    }
}

export default new AuthController();
