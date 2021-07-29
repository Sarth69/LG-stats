import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */
export type newPlayerData = {
  gameID: number;
  playerID: number;
};

export interface ErrorMessage {
  message: string;
}

function newPlayer(
  data: newPlayerData
): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game/player",
    data: data,
  };

  return { config };
}

export default newPlayer;
