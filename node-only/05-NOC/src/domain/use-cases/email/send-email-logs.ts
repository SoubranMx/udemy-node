import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import { LogRepository } from "@domain/repository/log.repository.ts";
import { EmailService } from "@presentation/email/email.service.ts";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error(`Email log was not sent`);
      }
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Log email sent`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
