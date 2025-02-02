import { createImage } from "../core/createImage.js";
import { Snippet } from "../types/index.js";
const image = async (fastify, opts) => {
    fastify.post("/api/image", async (request, reply) => {
        const body = request.body;
        const parsedBody = Snippet.parse(body);
        const imageResponse = await createImage(parsedBody);
        if (!imageResponse) {
            reply.code(500).send("Failed to generate image");
            return;
        }
        return imageResponse;
    });
};
export default image;
