export type DataState<T> = {
  data: T;
  status: Status;
  error: string | null;
};

export enum Status {
  'idle',
  'loading',
  'succeeded',
  'failed',
}
