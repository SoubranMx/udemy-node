import { envs } from "@config/plugins/envs.plugin.ts";
import { LogEntity, LogSeverityLevel } from "@domain/entities/log.entity.ts";
import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

const emailServiceOrigin = "email.service.ts";
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      console.log({ sentInformation });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Email sent",
        origin: emailServiceOrigin,
      });
      // this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: "Email not sent!",
        origin: emailServiceOrigin,
      });
      // this.logRepository.saveLog(log);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Server logs";
    const htmlBody = `<h3>Logs de sistema - NOC</h3>
      <p>Lorem ipsum fasdfasdfasdf</p>
      <p>Ver logs adjuntos</p>`;
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
