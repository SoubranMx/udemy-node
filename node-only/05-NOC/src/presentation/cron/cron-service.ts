import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    // See usage examples in: https://github.com/kelektiv/node-cron/tree/main/examples
    const job = new CronJob(cronTime, onTick);

    job.start();
    return job;
  }
}
