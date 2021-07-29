import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */
export type newGameData = {
  email: string;
};

export interface ErrorMessage {
  message: string;
}

function newGame(data: newGameData): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game",
    data: data,
  };

  return { config };
}

export default newGame;
