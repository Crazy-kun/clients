import { Request, Response } from "express";
import MainController from "./controller/MainController";
import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";
import express from "express";

const router = express.Router();

router.get("/", function(req: Request, res: Response) {
    MainController.index(req, res);
});

router.post("/auth", function(req: Request, res: Response) {
    AuthController.auth(req, res);
});

router.get("/logout", function(req: Request, res: Response) {
    AuthController.logout(req, res);
});

router.get("/checkauth", function(req: Request, res: Response) {
    AuthController.checkAuth(req, res);
});

router.post("/rabbitmq", function(req: Request, res: Response) {
    MainController.rabbit(req, res);
});

router.get("/users", function(req: Request, res: Response) {
    UserController.usersPagination(req, res);
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

router.get("/test", (req: Request, res: Response) => {
    MainController.test(req, res);
});

export default router;
