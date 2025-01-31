import type { FastifyPluginAsync } from "fastify";
import { createImage } from "./core/createImage.js";
import { Snippet } from "./types/index.js";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async (request, reply) => {
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

export default root;
