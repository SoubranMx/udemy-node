import { LogDatasource } from "@domain/datasources/log.datasource.ts";
import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prisma = new PrismaClient();

//To transform from our enum in lowcase to Postgres enum in uppercase.
const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });
    console.log("Prisma-log created", newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prisma.logModel.findMany({
      where: {
        level,
      },
    });
    const mappedLogs = logs.map((prismaLog) => LogEntity.fromObject(prismaLog));
    return mappedLogs;
  }
}
