/**
 * Production server for Render.com
 * Uses PORT from env (Render sets this), binds to 0.0.0.0 for external access
 */
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const jsonServer = require("json-server");

const port = process.env.PORT || 3030;
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(port, "0.0.0.0", () => {
  console.log(`JSON Server running at http://0.0.0.0:${port}`);
});
