import { AxiosRequestConfig } from "axios";

import { QueryReturnType } from "./useCustomQuery";

export interface MeResponse {
  user: {
    firstName: string;
    lastName: string;
    tlNickname: string;
    email: string;
    shield: number;
    image: any; //TO UPDATE
    achievements: any; //TO UPDATE
    gamesRelations: any; //TO UPDATE
  };
}

/**
 * A query to get info on current user
 * @returns - A queryReturnType used by useCustomQuery
 */
function meQuery(): QueryReturnType<string, MeResponse> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/player/me`,
  };
  return { key: "me", config };
}

export default meQuery;
