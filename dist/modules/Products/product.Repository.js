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
exports.ProductRepository = void 0;
const pg_1 = require("../../lib/pg");
class ProductRepository extends pg_1.Postgres {
    findName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch("select * from products where name = $1", name);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch("select * from products");
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch("select * from products where id = $1", id);
        });
    }
    insert(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch("insert into products(name, price, count) values($1, $2, $3) returning *", product.name, product.price, product.count);
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch("update products set name = $1, price = $2, count = $3 where id = $4 returning *", product.name, product.price, product.count, id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch("delete from products where id = $1 returning *", id);
        });
    }
}
exports.ProductRepository = ProductRepository;
