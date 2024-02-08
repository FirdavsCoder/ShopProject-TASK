"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_Repository_1 = require("./product.Repository");
const product_Entity_1 = require("./Entity/product.Entity");
const exception_1 = require("../../common/exception/exception");
const ResData_1 = require("../../common/ResData");
class ProductService {
    constructor() {
        this.productRepository = new product_Repository_1.ProductRepository();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProducts = yield this.productRepository.getAll();
            return new ResData_1.ResData("All products", 200, foundProducts);
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.productRepository.getOneById(id);
            if (!foundProduct.length) {
                throw new exception_1.BadRequestException("Product not found");
            }
            return new ResData_1.ResData("Product found", 200, foundProduct);
        });
    }
    insert(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.productRepository.findName(product.name);
            if (foundProduct.length) {
                throw new exception_1.BadRequestException("Product already exists");
            }
            const newProduct = new product_Entity_1.ProductEntity(product.name, product.price, product.count);
            const insertedProduct = yield this.productRepository.insert(newProduct);
            return new ResData_1.ResData("Product inserted", 201, insertedProduct);
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.productRepository.getOneById(id);
            if (!foundProduct.length) {
                throw new exception_1.BadRequestException("Product not found");
            }
            const foundName = yield this.productRepository.findName(product.name);
            if (foundName) {
                throw new exception_1.BadRequestException("Product already exists");
            }
            const updatedProduct = yield this.productRepository.update(id, new product_Entity_1.ProductEntity(product.name, product.price, product.count));
            return new ResData_1.ResData("Product updated", 200, updatedProduct);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.productRepository.getOneById(id);
            if (!foundProduct.length) {
                throw new exception_1.BadRequestException("Product not found");
            }
            const deletedProduct = yield this.productRepository.delete(id);
            return new ResData_1.ResData("Product deleted", 200, deletedProduct);
        });
    }
}
exports.ProductService = ProductService;
