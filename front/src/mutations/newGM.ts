import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */
export type newGMData = {
  gameID: number;
  playerID: number;
};

export interface ErrorMessage {
  message: string;
}

function newGM(data: newGMData): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game/gm",
    data: data,
  };

  return { config };
}

export default newGM;
