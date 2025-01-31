import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import image from "./routes/image";

async function app(
  instance: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void,
) {
  instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    res.status(200).send({ hello: "World" });
  });
  instance.register(image);
  done();
}

export default app;
