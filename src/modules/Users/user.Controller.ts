import {UserService} from "./user.Service";
import {ResData} from "../../common/ResData";
import {Request, Response} from "express";
import {userValidation} from "./Validation/user.Validation";
import Joi from "joi";
import {BadRequestException} from "../../common/exception/exception";


interface IUserBody {
    login: string;
    password: string;
    balance: number;
}

export class UserController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getAll(req: Request, res: Response) {
        try {
            const response: ResData = await this.userService.getAll()
            res.status(response.statusCode).json(response)
        } catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id: number = Number(req.params?.id);
            const response: ResData = await this.userService.getOneById(id);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const user: Required<IUserBody> = req.body;
            const validatedData: Joi.ValidationResult = userValidation.validate(user);
            if (validatedData.error) {
                throw new BadRequestException(validatedData.error.message)
            }
            const response: ResData = await this.userService.insert(user);
            return res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            return res.status(resData.statusCode).json(resData);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            const user: Required<IUserBody> = req.body;
            const validatedData: Joi.ValidationResult = userValidation.validate(user);
            if (validatedData.error) {
                throw new BadRequestException(validatedData.error.message)
            }
            const response: ResData = await this.userService.update(id, user);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            const response: ResData = await this.userService.delete(id);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }
}