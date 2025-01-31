"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createImage_js_1 = require("../core/createImage.js");
const index_js_1 = require("../types/index.js");
const image = async (fastify, opts) => {
    fastify.post("/api/image", async (request, reply) => {
        const body = request.body;
        const parsedBody = index_js_1.Snippet.parse(body);
        const imageResponse = await (0, createImage_js_1.createImage)(parsedBody);
        if (!imageResponse) {
            reply.code(500).send("Failed to generate image");
            return;
        }
        return imageResponse;
    });
};
exports.default = image;
