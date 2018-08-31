import { Request, Response } from "express";
import MainController from "./controller/MainController";
import UserController from "./controller/UserController";
import express from "express";

const router = express.Router();

router.get("/", function(req: Request, res: Response) {
    MainController.index(req, res);
});

router.get("/users", function(req: Request, res: Response) {
    UserController.users(req, res);
});

router.get("/cities", function(req: Request, res: Response) {
    MainController.cities(req, res);
});

router.get("/streets", function(req: Request, res: Response) {
    MainController.streets(req, res);
});

router.post("/saveusers", function(req: Request, res: Response) {
    UserController.saveUsers(req, res);
});

export default router;
