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

  //Create -> collection = table, document = register
  // const newLog = await LogModel.create({
  //   message: "Test message mongoose",
  //   origin: "App.ts",
  //   level: "low",
  // });
  // await newLog.save();
  // console.log(newLog);

  //Get
  // const logs = await LogModel.find();
  // console.log(logs);
  // console.log(logs[2].message);

  ServerApp.start();
}
