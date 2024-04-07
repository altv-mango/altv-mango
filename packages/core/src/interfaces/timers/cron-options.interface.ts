export type CronOptions = {
    name?: string;
    timeZone?: unknown;
    utcOffset?: unknown;
    unrefTimeout?: boolean;
    disabled?: boolean;
} & (
    | {
          timeZone?: string;
          utcOffset?: never;
      }
    | {
          timeZone?: never;
          utcOffset?: number;
      }
);
