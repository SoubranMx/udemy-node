import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { CronService } from "./cron/cron-service.js";

export class ServerApp {
  public static start() {
    console.log("Server started ...");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService().execute("https://google.com");
    });
  }
}
