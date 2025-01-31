import * as dotenv from "dotenv";
dotenv.config();

import { init } from "../public/server.js";

export default async function handler(req, res) {
  const app = init();
  await app.ready();

  return new Promise((resolve, reject) => {
    app.server.emit("request", req, res);
    res.on("finish", resolve);
  });
}
