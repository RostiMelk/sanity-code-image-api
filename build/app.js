"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("./routes/image"));
async function app(instance, opts, done) {
    instance.get("/", async (req, res) => {
        res.status(200).send({ hello: "World" });
    });
    instance.register(image_1.default);
    done();
}
exports.default = app;
