import { CheckServiceMultiple } from "@domain/use-cases/checks/check-service-multiple.ts";
import { FileSystemDatasource } from "@infrastructure/datasources/file-system.datasource.ts";
import { MongoLogDatasource } from "@infrastructure/datasources/mongo-log.datasource.ts";
import { PostgresLogDatasource } from "@infrastructure/datasources/postgresql-log.datasource.ts";
import { LogRepositoryImpl } from "@infrastructure/repositories/log.repository.impl.ts";
import { CronService } from "./cron/cron-service.ts";
import { EmailService } from "./email/email.service.ts";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const postgreLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

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
    // CronService.createJob(jobTimer, () => {
    //   new CheckService(
    //     logRepository,
    //     () => successInjection(url),
    //     errorInjection
    //   ).execute(url);
    // });

    //With multiple
    CronService.createJob(jobTimer, () => {
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgreLogRepository],
        () => successInjection(url),
        errorInjection
      ).execute(url);
    });

    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);
  }
}
