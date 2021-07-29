import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to update the current game's dates
 * @param data
 * @returns
 */
export type FormValues = {};

export interface ErrorMessage {
  message: string;
}

function date(data: FormValues): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game/date",
    data: data,
  };

  return { config };
}

export default date;
