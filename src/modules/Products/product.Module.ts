import {ProductController} from "./product.Controller";
import {ProductService} from "./product.Service";
import {Router} from "express";
import {Request, Response} from "express";


const router = Router();
const productService = new ProductService();
const productController = new ProductController(productService);

router.get("/:id", (req: Request, res: Response) => productController.getOne(req, res));
router.get("/", (req: Request, res: Response) => productController.getAll(req, res));
router.post("/", (req: Request, res: Response) => productController.insert(req, res));
router.put("/:id", (req: Request, res: Response) => productController.update(req, res));
router.delete("/:id", (req: Request, res: Response) => productController.delete(req, res));


export default router;
