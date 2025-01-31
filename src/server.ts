import Fastify from "fastify";
import { createImage } from "./core/createImage";
import { Snippet } from "./types";

const PORT = 3333;

export function init() {
  const app = Fastify({
    logger: true,
  });

  app.get("/", async (request, reply) => {
    return "Hello from Sanity.io";
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

if (require.main === module) {
  init()
    .listen({
      port: PORT,
    })
    .then(() => {
      console.log(`Running on port ${PORT}`);
    });
}
