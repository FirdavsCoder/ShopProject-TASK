import {ProductService} from "./product.Service";
import {ResData} from "../../common/ResData";
import {Request, Response} from "express";
import {productValidation} from "./Validation/product.Validation";
import {BadRequestException} from "../../common/exception/exception";

interface IProductBody {
    name: string;
    price: number;
    count: number;
}

export class ProductController {
    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }



    async getAll(req: Request, res: Response) {
        try {
            const response: ResData = await this.productService.getAll()
            res.status(response.statusCode).json(response)
        } catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }


    async getOne(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            console.log(id)
            const response: ResData = await this.productService.getOneById(id);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }


    async insert(req: Request, res: Response) {
        try {
            const product: Required<IProductBody> = req.body;
            const validatedData = productValidation.validate(product);
            if (validatedData.error) {
                throw new BadRequestException(validatedData.error.message)
            }
            const response: ResData = await this.productService.insert(product);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id: number = Number(req.params?.id);
            const product: Required<IProductBody> = req.body;

            const validatedData = productValidation.validate(product);
            if (validatedData.error) {
                throw new BadRequestException(validatedData.error.message)
            }
            

            const response: ResData = await this.productService.update(id, product);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id: number = Number(req.params?.id);
            const response: ResData = await this.productService.delete(id);
            res.status(response.statusCode).json(response)
        }
        catch (error: any) {
            const resData = new ResData(error.message, error.statusCode || 500, [null], error);
            res.status(resData.statusCode).json(resData);
        }
    }
}