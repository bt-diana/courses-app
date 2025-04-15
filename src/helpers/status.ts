import { Status } from '../types';

export const isIdle = (value: Status) => value === Status.idle;
export const isLoading = (value: Status) => value === Status.loading;
export const isSucceeded = (value: Status) => value === Status.succeeded;
export const isFailed = (value: Status) => value === Status.failed;
