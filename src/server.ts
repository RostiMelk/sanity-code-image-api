import Fastify from "fastify";
import { createImage } from "./core/createImage.js";
import { Snippet } from "./types/index.js";

const PORT = 3333;

export function init() {
  const app = Fastify({
    logger: true,
  });

  app.get("/", () => {
    return { hello: "world" };
  });

  app.post("/api/image", async (request, reply) => {
    const body = request.body;
    const parsedBody = Snippet.parse(body);
    const imageResponse = await createImage(parsedBody);

    if (!imageResponse) {
      reply.code(500).send("Failed to generate image");
      return;
    }

    return imageResponse;
  });

  return app;
}

// Replace the CommonJS check with ESM style
if (import.meta.url === import.meta.resolve("./server.js")) {
  init()
    .listen({
      port: PORT,
    })
    .then(() => {
      console.log(`Running on port ${PORT}`);
    });
}
