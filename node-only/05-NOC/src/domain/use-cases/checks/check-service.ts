import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import { LogRepository } from "@domain/repository/log.repository.ts";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export const checkServiceOrigin = "check-service.ts";

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: checkServiceOrigin,
      });
      this.logRepository.saveLog(log);
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage = `${url} not ok. ${error}`;
      const errorLog = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: checkServiceOrigin,
      });
      this.logRepository.saveLog(errorLog);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
