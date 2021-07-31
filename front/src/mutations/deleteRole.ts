import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

/**
 * Send a request to the server to sign the user in
 * @param data
 * @returns
 */

export interface DeleteRoleData {
  name: string;
  gameID: string;
}

export interface ErrorMessage {
  message: string;
}

function deleteRole(
  data: DeleteRoleData
): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/game/role/delete",
    data: data,
  };

  return { config };
}

export default deleteRole;
