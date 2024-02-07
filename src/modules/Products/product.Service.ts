import {ProductRepository} from './product.Repository';
import {ProductEntity} from './Entity/product.Entity';
import {BadRequestException} from "../../common/exception/exception";
import {ResData} from "../../common/ResData";


interface IProduct {
    id: number;
    name: string;
    price: number;
    count: number;
}

interface IProductBody {
    name: string;
    price: number;
    count: number;
}

export class ProductService {
    productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository()
    }
    async getAll(): Promise<ResData> {
        const foundProducts: IProduct[] = await this.productRepository.getAll<IProduct>();
        console.log(foundProducts);
        return new ResData("All products", 200, foundProducts);
    }



    async getOneById(id: number): Promise<ResData> {
        const foundProduct: IProduct[] = await this.productRepository.getOneById<IProduct>(id);
        if (!foundProduct.length) {
            throw new BadRequestException("Product not found")
        }

        return new ResData("Product found", 200, foundProduct);
    }



    async insert(product: IProductBody): Promise<ResData> {
        const foundProduct: IProduct[] = await this.productRepository.findName(product.name);
        if (foundProduct.length) {
            throw new BadRequestException("Product already exists")
        }
        const newProduct = new ProductEntity(product.name, product.price, product.count);
        console.log(newProduct);

        const insertedProduct = await this.productRepository.insert<IProduct>(newProduct);
        return new ResData("Product inserted", 201, insertedProduct);
    }

    async update(id: number, product: IProductBody): Promise<ResData> {
        const foundProduct = await this.productRepository.getOneById<IProduct>(id);
        if (!foundProduct.length) {
            throw new BadRequestException("Product not found")
        }

        const foundName = await this.productRepository.findName<IProduct>(product.name);
        if (foundName) {
            throw new BadRequestException("Product already exists")
        }

        const updatedProduct = await this.productRepository.update<IProduct>(id, new ProductEntity(product.name, product.price, product.count));
        return new ResData("Product updated", 200, updatedProduct);
    }

    async delete(id: number): Promise<ResData> {
        const foundProduct = await this.productRepository.getOneById<IProduct>(id);
        if (!foundProduct.length) {
            throw new BadRequestException("Product not found")
        }
        const deletedProduct = await this.productRepository.delete<IProduct>(id);
        return new ResData("Product deleted", 200, deletedProduct);
    }
}
