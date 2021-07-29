import { AxiosRequestConfig } from "axios";

import { QueryReturnType } from "./useCustomQuery";

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  tl_nickname: string;
  shield: number;
  image: string | undefined;
  email: string;
  password: string;
}

/**
 * A query to get info on the game with the id given
 * @returns - A queryReturnType used by useCustomQuery
 */
function playersQuery(): QueryReturnType<string[], Player[]> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/player`,
  };
  return { key: ["player"], config };
}

export default playersQuery;
