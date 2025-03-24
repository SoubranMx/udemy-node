import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { CronService } from "./cron/cron-service.js";

function successInjection(url: string) {
  console.log(`${url} is ok`);
}

function errorInjection(error: string) {
  console.error(error);
}
export class ServerApp {
  public static start() {
    console.log("Server started ...");

    const url = "https://google.com";
    const jobTimer = "*/5 * * * * *";
    CronService.createJob(jobTimer, () => {
      new CheckService(() => successInjection(url), errorInjection).execute(
        url
      );
    });
  }
}
