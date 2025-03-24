import { FileSystemDatasource } from "@infrastructure/datasources/file-system.datasource.ts";
import { LogRepositoryImpl } from "@infrastructure/repositories/log.repository.impl.ts";

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

    //Email sender

    //Dependency injection
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendEmailWithFileSystemLogs(["uriel_bee15@hotmail.com"]);

    // emailService.sendEmail({
    //   to: "uriel_bee15@hotmail.com",
    //   subject: "Node NOC",
    //   htmlBody: `<h3>Logs de sistema - NOC</h3>
    //   <p>Lorem ipsum fasdfasdfasdf</p>
    //   <p>Ver logs adjuntos</p>
    //   `,
    // });

    //CRONJOB
    // const url = "http://localhost:3000";
    // const jobTimer = "*/10 * * * * *";
    // CronService.createJob(jobTimer, () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => successInjection(url),
    //     errorInjection
    //   ).execute(url);
    // });
  }
}
