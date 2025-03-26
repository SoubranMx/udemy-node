import { LogSeverityLevel } from "@domain/entities/log.entity.ts";
import { CheckService } from "@domain/use-cases/checks/check-service.ts";
import { PostgresLogDatasource } from "@infrastructure/datasources/postgresql-log.datasource.ts";
import { LogRepositoryImpl } from "@infrastructure/repositories/log.repository.impl.ts";
import { CronService } from "./cron/cron-service.ts";
import { EmailService } from "./email/email.service.ts";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  // new MongoLogDatasource()
  new PostgresLogDatasource()
);

function successInjection(url: string) {
  console.log(`${url} is ok`);
}

function errorInjection(error: string) {
  console.error(error);
}

const emailService = new EmailService();

export class ServerApp {
  public static async start() {
    console.log("Server started ...");

    //Email sender
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   envs.DEFAULT_TO_MAIL,
    // ]);
    //Dependency injection
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendEmailWithFileSystemLogs([envs.DEFAULT_TO_MAIL]);

    // emailService.sendEmail({
    //   to: envs.DEFAULT_TO_MAIL,
    //   subject: "Node NOC",
    //   htmlBody: `<h3>Logs de sistema - NOC</h3>
    //   <p>Lorem ipsum fasdfasdfasdf</p>
    //   <p>Ver logs adjuntos</p>
    //   `,
    // });

    //CRONJOB
    const url = "http://localhost:3000";
    const jobTimer = "*/10 * * * * *";
    CronService.createJob(jobTimer, () => {
      new CheckService(
        logRepository,
        () => successInjection(url),
        errorInjection
      ).execute(url);
    });

    const logs = await logRepository.getLogs(LogSeverityLevel.high);
    console.log(logs);
  }
}
