import * as dotenv from "dotenv";
dotenv.config();

import { init } from "../public/server.js";

export default async function handler(req, res) {
  try {
    console.log('Request received:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
    });

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const app = init();
    await app.ready();

    return new Promise((resolve, reject) => {
      app.server.emit("request", req, res);
      res.on("finish", resolve);
      res.on("error", reject);
    });
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: error.message });
  }
}