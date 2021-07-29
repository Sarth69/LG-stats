import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";
import { Players_relations } from "../queries/game";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */

export interface ErrorMessage {
  message: string;
}

function deletePlayer(
  data: Players_relations
): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game/player/delete",
    data: data,
  };

  return { config };
}

export default deletePlayer;
