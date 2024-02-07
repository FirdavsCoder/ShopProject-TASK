import {Router} from "express";
import productModule from "./Products/product.Module";

const router = Router();

router.use("/products", productModule);

export default router;


