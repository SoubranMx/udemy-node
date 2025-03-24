import { LogDatasource } from "@domain/datasources/log.datasource.ts";
import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import { LogRepository } from "@domain/repository/log.repository.ts";

export class LogRepositoryImpl implements LogRepository {
  /*
    short way of
    private logDatasource: LogDatasource;

    constructor(datasource: LogDatasource){
      this.logDatasource = datasource;
    }
  */
  constructor(
    private readonly logDatasource: LogDatasource // <--- Logic behind this file is that this dependency can change as long as those datasources implements saveLog and getLogs
  ) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
