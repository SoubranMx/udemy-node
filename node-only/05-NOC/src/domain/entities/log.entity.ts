export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  //"{"level":"high","message":"Hello World!","createdAt":12314151}"
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);
    //Should have guards
    //if(!message) throw new Error("Message is required");

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt); //Overwrite constructor createdAt with the log actual date.
    return log;
  };
}
