import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import routes from "../src/app";

const app = Fastify({
  logger: false,
});

app.register(routes, {
  prefix: "/",
});
export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
