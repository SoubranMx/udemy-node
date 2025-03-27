import { envs } from "./envs.plugin.ts";

describe("envs.plugin.test.ts", () => {
  test("should return env options", async () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: "mailer@gmail.com",
      MAILER_SECRET_KEY: "12345",
      MAILER_SERVICE: "gmail",
      DEFAULT_TO_MAIL: "default@email.com",
      PROD: true,
      MONGO_URL: "mongodb://soubran:123456789@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "soubran",
      MONGO_PASS: "123456789",
      POSTGRES_URL: "postgresql://postgres:123456789@localhost:5432/NOC",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "123456789",
    });
  });

  test("should throw error if env not found", async () => {
    vitest.resetModules();
    process.env.PORT = "ABC";
    try {
      await import("./envs.plugin.ts");
      expect(true).toBe(false); //wtf is this hack
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
