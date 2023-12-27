import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import { AxiosError } from "axios";

const showError = (error: AxiosError<ApiFailureError<any>>) => {
  console.log(error);
  return error.response?.data?.error?.length > 0
    ? error.response?.data?.error[0]
    : error.response?.data.message
    ? error?.response?.data?.message
    : error.message;
};
export { showError };
