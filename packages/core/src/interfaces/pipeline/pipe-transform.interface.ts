import type { ArgumentMetadata } from './argument-metadata.interface';

export interface Pipe<TInput = unknown, TOutput = unknown> {
    transform(value: TInput, metadata: ArgumentMetadata): TOutput;
}
