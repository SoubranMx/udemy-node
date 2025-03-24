import { envs } from "@config/plugins/envs.plugin.ts";
import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  // TODO: attachments
}

// TODO: Attachment

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });
      console.log({ sentInformation });

      return true;
    } catch (error) {
      return false;
    }
  }
}
