import {Router} from "express";
import productModule from "./Products/product.Module";
import userModule from "./Users/user.Module";
import transactionModule from "./Transactions/transaction.Module";

const router = Router();

router.use("/products", productModule);
router.use("/users", userModule);
router.use("/transactions", transactionModule);

export default router;


