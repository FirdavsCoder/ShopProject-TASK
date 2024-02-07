"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./common/config");
const app_module_1 = __importDefault(require("./modules/app.module"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use("/api/v1/", app_module_1.default);
app.listen(config_1.config.port, () => {
    console.log(`http://localhost:${config_1.config.port}`);
});
