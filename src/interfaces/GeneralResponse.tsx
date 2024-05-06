export interface GeneralResponse<T = null> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface ErrorResponse {
  data: {
    errors: {
      [key: string]: string[];
    };
  };
}
