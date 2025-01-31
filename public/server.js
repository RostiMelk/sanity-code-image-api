"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const fastify_1 = __importDefault(require("fastify"));
const createImage_1 = require("./core/createImage");
const types_1 = require("./types");
const PORT = 3333;
function init() {
    const app = (0, fastify_1.default)({
        logger: true,
    });
    app.post("/api/image", async (request, reply) => {
        const body = request.body;
        const parsedBody = types_1.Snippet.parse(body);
        const imageResponse = await (0, createImage_1.createImage)(parsedBody);
        if (!imageResponse) {
            reply.code(500).send("Failed to generate image");
            return;
        }
        return imageResponse;
    });
    return app;
}
if (require.main === module) {
    init()
        .listen({
        port: PORT,
    })
        .then(() => {
        console.log(`Running on port ${PORT}`);
    });
}
