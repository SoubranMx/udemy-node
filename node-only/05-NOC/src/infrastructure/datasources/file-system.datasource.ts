import { LogDatasource } from "@domain/datasources/log.datasource.ts";
import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import fs from "fs";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    //verify path exists
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    //create intermediate files
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {}

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(newLog);

    //Adds at the last of the file
    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`);

    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }
}
