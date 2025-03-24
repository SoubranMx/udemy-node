import { FileSystemDatasource } from "@infrastructure/datasources/file-system.datasource.ts";
import { LogRepositoryImpl } from "@infrastructure/repositories/log.repository.impl.ts";
import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { CronService } from "./cron/cron-service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new postgreDatasource
  // new mongoDatasource, etc
);

function successInjection(url: string) {
  console.log(`${url} is ok`);
}

function errorInjection(error: string) {
  console.error(error);
}
export class ServerApp {
  public static start() {
    console.log("Server started ...");

    const url = "http://localhost:3000";
    const jobTimer = "*/10 * * * * *";
    CronService.createJob(jobTimer, () => {
      new CheckService(
        fileSystemLogRepository,
        () => successInjection(url),
        errorInjection
      ).execute(url);
    });
  }
}
