import * as dotenv from "dotenv";
dotenv.config();

import { init } from "../public/server.js";

export default async function handler(req, res) {
  const app = init();
  await app.ready();

  // Log the incoming request for debugging
  console.log("Incoming request:", {
    method: req.method,
    url: req.url,
    path: req.path,
  });

  return new Promise((resolve, reject) => {
    app.server.emit("request", req, res);
    res.on("finish", resolve);
    res.on("error", reject);
  });
}
