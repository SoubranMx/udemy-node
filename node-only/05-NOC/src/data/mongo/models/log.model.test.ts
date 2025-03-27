import mongoose from "mongoose";
import { MongoDatabase } from "../init.ts";
import { LogModel } from "./log.model.ts";

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    //erase registry
    await LogModel.findByIdAndDelete(log.id);
  });

  test("should return the schema object", async () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        // createdAt: { type: expect.any(Function), default: 2025-03-27T04:47:52.791Z }
        createdAt: expect.any(Object),
      })
    );
  });
});
