import { envs } from "@config/plugins/envs.plugin.ts";
import { ServerApp } from "@presentation/server.ts";
import "dotenv/config";
import { MongoDatabase } from "./data/mongo/index.ts";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  ServerApp.start();
}
