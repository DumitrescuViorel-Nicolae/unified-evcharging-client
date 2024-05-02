export interface GeneralResponse<T = null> {
  Success: boolean;
  Message: string;
  Data: T | null;
}
