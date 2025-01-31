import type { FastifyPluginAsync } from "fastify";
import image from "./routes/image";

export type AppOptions = {};

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  void fastify.register(image);
};

export default app;
export { app, options };
