import { envs } from "@config/plugins/envs.plugin.ts";
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

  // Prisma -> make sure import comes from @prisma/client not @prisma/client/extension or something else
  // const prisma = new PrismaClient();
  //Create
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message from prisma",
  //     origin: "App.ts",
  //   },
  // });
  //Get -> findMany getAll, you can include where clauses, this is already typed due to prisma migration
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "MEDIUM",
  //   },
  // });
  // ServerApp.start();
}
