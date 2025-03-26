export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}
export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  //"{"level":"high","message":"Hello World!","createdAt":12314151}"
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    //Should have guards
    //if(!message) throw new Error("Message is required");

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    // log.createdAt = new Date(createdAt); //Overwrite constructor createdAt with the log actual date.
    return log;
  };

  //this adapts object from mongoDB schema to a LogEntity
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    //we can make validations here
    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt,
    });
    return log;
  };
}
