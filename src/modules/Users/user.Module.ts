import {UserController} from "./user.Controller";
import {UserService} from "./user.Service";
import {Router} from "express";
import {Request, Response} from "express";

const router: Router = Router();
const userService = new UserService();
const userController = new UserController(userService);


router.get("/", async (req: Request, res: Response) => {
    await userController.getAll(req, res)
})
router.get("/:id", async (req: Request, res: Response) => {
    await userController.getOne(req, res)
})

router.post("/", async (req: Request, res: Response) => {
    await userController.insert(req, res)
})

router.put("/:id", async (req: Request, res: Response) => {
    await userController.update(req, res)
})

router.delete("/:id", async (req: Request, res: Response) => {
    await userController.delete(req, res)
})


export default router;