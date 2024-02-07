"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_Module_1 = __importDefault(require("./Products/product.Module"));
const router = (0, express_1.Router)();
router.use("/products", product_Module_1.default);
exports.default = router;
