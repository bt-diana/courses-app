export type DataState = {
  status: Status;
  error: string | null;
};

export enum Status {
  'idle',
  'loading',
  'succeeded',
  'failed',
}
