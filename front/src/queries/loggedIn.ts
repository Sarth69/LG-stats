import { AxiosRequestConfig } from "axios";

import { QueryReturnType } from "./useCustomQuery";

export interface LoggedInResponse {
  isLoggedIn: boolean;
}

/**
 * A query to get info on whether the user is logged in or not
 * @returns - A queryReturnType used by useCustomQuery
 */
function loggedInQuery(): QueryReturnType<string[], LoggedInResponse> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/player/is-logged`,
  };
  return { key: ["player", "isLoggedIn"], config };
}

export default loggedInQuery;
