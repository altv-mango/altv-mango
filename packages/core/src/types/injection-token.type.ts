import type { Newable } from './newable.type';
import type { Abstract } from './abstract.type';

export type InjectionToken<T = unknown> = string | symbol | Newable<T> | Abstract<T>;
