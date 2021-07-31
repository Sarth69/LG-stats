import { AxiosRequestConfig } from "axios";

import { QueryReturnType } from "./useCustomQuery";

export interface Role {
  id: number;
  name: string;
  description: string;
  side: string;
}

/**
 * A query to get info on the game with the id given
 * @returns - A queryReturnType used by useCustomQuery
 */
function rolesQuery(): QueryReturnType<string[], Role[]> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/role`,
  };
  return { key: ["role"], config };
}

export default rolesQuery;
