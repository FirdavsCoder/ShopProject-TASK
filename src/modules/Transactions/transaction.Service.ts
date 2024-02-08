import {TransactionEntity} from "./Entity/transaction.Entity";
import {TransactionRepository} from "./transaction.Repository";
import {ResData} from "../../common/ResData";
import {ProductService} from "../Products/product.Service";
import {BadRequestException} from "../../common/exception/exception";


interface ITransactionBody{
    product_id: number;
    product_count: number;
}

interface ITransaction {
    id: number;
    user_id: number;
    product_id: number;
    product_count: number;
    total_price: number;
}

export class TransactionService {
    transactionRepository: TransactionRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    async insert(transaction: ITransactionBody, id: number): Promise<ResData> {
        const productService: ProductService = new ProductService();
        const foundProduct: ResData = await productService.getOneById(transaction.product_id);
        if (!foundProduct || foundProduct.data.count < transaction.product_count) {
            throw new BadRequestException("Product not found or not enough count")
        }

        const total_price = foundProduct.data.price * transaction.product_count;
        const newTransaction = new TransactionEntity(id, transaction.product_id, transaction.product_count, total_price);

        const createdTransaction = await this.transactionRepository.insert<ITransaction>(newTransaction);
        return new ResData("Transaction inserted", 201, createdTransaction);

    }


    async getAll(): Promise<ResData> {
        const foundTransactions: ITransaction[] = await this.transactionRepository.getAll<ITransaction>();
        return new ResData("All transactions", 200, foundTransactions);
    }

    async getOneById(id: number): Promise<ResData> {
        const foundTransaction: ITransaction = await this.transactionRepository.getOneById<ITransaction>(id);
        if (!foundTransaction) {
            throw new BadRequestException("Transaction not found")
        }
        return new ResData("Transaction found", 200, foundTransaction);
    }



}