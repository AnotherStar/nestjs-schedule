import { CronJob } from 'cron';
import { CronJobContext } from './context';
export declare class SchedulerRegistry {
    private readonly logger;
    private readonly cronJobs;
    private readonly timeouts;
    private readonly intervals;
    doesExist(type: 'cron' | 'timeout' | 'interval', name: string): boolean;
    getCronJob(name: string): CronJob<null, null> & {
        context: CronJobContext;
    };
    getInterval(name: string): any;
    getTimeout(name: string): any;
    addCronJob(name: string, job: CronJob & {
        context: CronJobContext;
    }, context: CronJobContext): void;
    addInterval<T = any>(name: string, intervalId: T): void;
    addTimeout<T = any>(name: string, timeoutId: T): void;
    getCronJobs(): Map<string, CronJob>;
    deleteCronJob(name: string): void;
    getIntervals(): string[];
    deleteInterval(name: string): void;
    getTimeouts(): string[];
    deleteTimeout(name: string): void;
    private wrapFunctionInTryCatchBlocks;
}
