import {TransactionController} from "./transaction.Controller";
import {TransactionService} from "./transaction.Service";
import {Router, Request, Response} from "express";


const router: Router = Router();
const transactionService: TransactionService = new TransactionService();
const transactionController: TransactionController = new TransactionController(transactionService);


router.get("/", async (req: Request, res: Response) => {
    await transactionController.getAll(req, res)
})
router.get("/:id", async (req: Request, res: Response) => {
    await transactionController.getOne(req, res)
})

router.post("/", async (req: Request, res: Response) => {
    await transactionController.insert(req, res)
})

export default router;

