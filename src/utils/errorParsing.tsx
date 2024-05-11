import { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/GeneralResponse";
import { toast } from "react-toastify";

export function handleAxiosError(error) {
  const axiosError = error as AxiosError<ErrorResponse>;
  const errorData = axiosError.response?.data.errors as
    | Record<string, string[]>
    | undefined;

  if (errorData) {
    Object.keys(errorData).forEach((key) => {
      const errorMessage = errorData[key].join(" ");
      toast.error(errorMessage);
    });
  } else {
    toast.error(`An unknown error occurred:" ${error.message}`);
  }
}
