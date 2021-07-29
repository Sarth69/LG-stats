import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */
export type FormValues = {
  email: string;
  password: string;
};

export interface ErrorMessage {
  message: string;
}

function signIn(data: FormValues): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/login/signin",
    data: data,
  };

  return { config };
}

export default signIn;
