"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../common/config");
function jwtSign(data) {
    return jsonwebtoken_1.default.sign(data, config_1.config.jwtKey);
}
exports.jwtSign = jwtSign;
function verifyToken(data) {
    return jsonwebtoken_1.default.verify(data, config_1.config.jwtKey);
}
exports.verifyToken = verifyToken;
