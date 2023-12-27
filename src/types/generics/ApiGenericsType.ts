export interface ApiSucessResponse<T> {
  statusCode: number;
  data: T | T[];
  message: string;
  sucess: boolean;
}

export interface ApiFailureError<T> {
  statusCode: number;
  error: T | null | [] | T[];
  message:string;
}
