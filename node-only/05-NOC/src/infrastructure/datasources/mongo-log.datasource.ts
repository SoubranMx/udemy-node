import { LogDatasource } from "@domain/datasources/log.datasource.ts";
import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import { LogModel } from "../../data/mongo/index.ts";

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    //await newLog.save();
    console.log("Mongo-log created", newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel,
    });
    const mappedLogs = logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
    return mappedLogs;
  }
}
