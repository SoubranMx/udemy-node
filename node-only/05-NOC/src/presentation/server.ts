import { CronJob } from "cron";

export class ServerApp {
  public static start() {
    console.log("Server started ...");

    // See usage examples in: https://github.com/kelektiv/node-cron/tree/main/examples
    const job = new CronJob("*/2 * * * * *", () => {
      const date = new Date();
      console.log("2 second", date);
    });
    job.start();
  }
}
