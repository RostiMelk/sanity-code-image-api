// Require the framework
import { init } from "../public/server";

export default async (req, res) => {
  const app = init();
  await app.ready();
  app.server.emit("request", req, res);
};
