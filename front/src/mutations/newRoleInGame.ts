import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */
export type newRoleInGameData = {
  name: string;
  gameID: number;
};

export interface ErrorMessage {
  message: string;
}

function newRoleInGame(
  data: newRoleInGameData
): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game/role",
    data: data,
  };

  return { config };
}

export default newRoleInGame;
