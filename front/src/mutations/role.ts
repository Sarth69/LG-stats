import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */
export type newRoleData = {
  name: string;
  description: string;
  side: string;
};

export interface ErrorMessage {
  message: string;
}

function role(data: newRoleData): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/role",
    data: data,
  };

  return { config };
}

export default role;
