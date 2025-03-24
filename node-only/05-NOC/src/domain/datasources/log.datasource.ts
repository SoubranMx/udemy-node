import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.js";

//abstract => can't create an instance of an abstract class
//we can force the behavior of this class into other classes
export abstract class LogDatasource {
  //If someone wants to use this LogDatasource, they MUST implement saveLog and getLogs, BOTH.
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
