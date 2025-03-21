import { CronService } from "./cron/cron-service.js";

export class ServerApp {
  public static start() {
    console.log("Server started ...");

    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();
      console.log("5 seconds", date);
    });
  }
}
