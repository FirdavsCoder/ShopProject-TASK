import {ResData} from "../../common/ResData";
import {TransactionEntity} from "./Entity/transaction.Entity";
import {Request, Response} from "express";
import {verifyToken} from "../../lib/jwt";
import {TransactionService} from "./transaction.Service";
import {transactionValidation} from "./Validation/user.Validation";
import Joi from "joi";
import {BadRequestException} from "../../common/exception/exception";


interface ITransactionBody {
    product_id: number;
    product_count: number;
}


export class TransactionController {
    transactionService: TransactionService;

    constructor(transactionService: TransactionService) {
        this.transactionService = transactionService;
    }

    async getAll(req: Request, res: Response) {
        try {
            const response: ResData = await this.transactionService.getAll()
            res.status(response.statusCode).json(response)
        } catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id: number = Number(req.params?.id);
            const response: ResData = await this.transactionService.getOneById(id);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const token: string | undefined = req.headers.authorization;
            const user_id: number = Number(verifyToken(token));
            const transaction: Required<ITransactionBody> = req.body;
            const validatedData: Joi.ValidationResult = transactionValidation.validate(transaction);
            if (validatedData.error) {
                throw new BadRequestException(validatedData.error.message)
            }
            const response: ResData = await this.transactionService.insert(transaction, user_id );
            return res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            return res.status(resData.statusCode).json(resData);
        }
    }
}