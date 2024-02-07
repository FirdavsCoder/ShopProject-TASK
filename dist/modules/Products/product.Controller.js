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
exports.ProductController = void 0;
const ResData_1 = require("../../common/ResData");
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.productService.getAll();
                res.status(response.statusCode).json(response);
            }
            catch (error) {
                const resData = new ResData_1.ResData(error.message, error.statusCode || 500, [null], error);
                res.status(resData.statusCode).json(resData);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const response = yield this.productService.getOneById(id);
                res.status(response.statusCode).json(response);
            }
            catch (error) {
                const resData = new ResData_1.ResData(error.message, error.statusCode || 500, [null], error);
                res.status(resData.statusCode).json(resData);
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const response = yield this.productService.insert(product);
                res.status(response.statusCode).json(response);
            }
            catch (error) {
                const resData = new ResData_1.ResData(error.message, error.statusCode || 500, [null], error);
                res.status(resData.statusCode).json(resData);
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                const product = req.body;
                const response = yield this.productService.update(id, product);
                res.status(response.statusCode).json(response);
            }
            catch (error) {
                const resData = new ResData_1.ResData(error.message, error.statusCode || 500, [null], error);
                res.status(resData.statusCode).json(resData);
            }
        });
    }
    delete(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                const response = yield this.productService.delete(id);
                res.status(response.statusCode).json(response);
            }
            catch (error) {
                const resData = new ResData_1.ResData(error.message, error.statusCode || 500, [null], error);
                res.status(resData.statusCode).json(resData);
            }
        });
    }
}
exports.ProductController = ProductController;
