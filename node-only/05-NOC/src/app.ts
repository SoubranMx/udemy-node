import { ServerApp } from "@presentation/server.ts";
import "dotenv/config";
(() => {
  main();
})();

function main() {
  ServerApp.start();
}
