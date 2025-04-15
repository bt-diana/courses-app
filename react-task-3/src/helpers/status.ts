import { Status } from '../types';

export const isLoading = (value: Status) => value === Status.loading || value === Status.idle;
export const isSucceeded = (value: Status) => value === Status.succeeded;
export const isFailed = (value: Status) => value === Status.failed;
