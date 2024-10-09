import { Injectable } from '@nestjs/common';
import { Cron } from '../../lib/decorators';
import { CronExpression } from '../../lib/enums';
import { SchedulerRegistry } from '../../lib/scheduler.registry';
import { CronJob } from 'cron';
import { CronJobContext } from '../../lib/context';

@Injectable()
export class CronService {
  callsCount = 0;
  dynamicCallsCount = 0;

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  @Cron(
    CronExpression.EVERY_SECOND,
    {
      name: 'EXECUTES_EVERY_SECOND',
    },
    {
      runOnServerNames: ['test'],
    },
  )
  handleCron() {
    ++this.callsCount;
    if (this.callsCount > 2) {
      const ref = this.schedulerRegistry.getCronJob('EXECUTES_EVERY_SECOND');
      ref!.stop();
    }
  }

  @Cron(
    CronExpression.EVERY_30_SECONDS,
    {
      name: 'EXECUTES_EVERY_30_SECONDS',
    },
    {
      runOnServerNames: ['test'],
    },
  )
  handleCronEvery30Seconds() {
    ++this.callsCount;
    if (this.callsCount === 1) {
      const ref = this.schedulerRegistry.getCronJob(
        'EXECUTES_EVERY_30_SECONDS',
      );
      ref!.stop();
    }
  }

  @Cron(
    CronExpression.EVERY_MINUTE,
    {
      name: 'EXECUTES_EVERY_MINUTE',
    },
    {
      runOnServerNames: ['test'],
    },
  )
  handleCronEveryMinute() {
    ++this.callsCount;
    if (this.callsCount > 2) {
      const ref = this.schedulerRegistry.getCronJob('EXECUTES_EVERY_MINUTE');
      ref!.stop();
    }
  }

  @Cron(
    CronExpression.EVERY_HOUR,
    {
      name: 'EXECUTES_EVERY_HOUR',
    },
    {
      runOnServerNames: ['test'],
    },
  )
  handleCronEveryHour() {
    ++this.callsCount;
    if (this.callsCount > 2) {
      const ref = this.schedulerRegistry.getCronJob('EXECUTES_EVERY_HOUR');
      ref!.stop();
    }
  }

  @Cron(
    CronExpression.EVERY_30_SECONDS,
    {
      name: 'DISABLED',
      disabled: true,
    },
    {
      runOnServerNames: ['test'],
    },
  )
  handleDisabledCron() {}

  addCronJob(): CronJob {
    const job = new CronJob(CronExpression.EVERY_SECOND, () => {
      ++this.dynamicCallsCount;
      if (this.dynamicCallsCount > 2) {
        const ref = this.schedulerRegistry.getCronJob('dynamic');
        ref!.stop();
      }
    }) as CronJob<null, null> & { context: CronJobContext };

    const context: CronJobContext = { runOnServerNames: ['test'] };

    Object.assign(job, { context });

    this.schedulerRegistry.addCronJob('dynamic', job, context);
    return job;
  }

  doesExist(name: string): boolean {
    return this.schedulerRegistry.doesExist('cron', name);
  }

  doesContextExist(name: string): boolean {
    const job = this.schedulerRegistry.getCronJob(name);
    console.log({ job });
    return job.context.runOnServerNames.length > 0;
  }
}
