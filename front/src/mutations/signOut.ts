import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

function signOut(): MutationReturnType {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/login/signout",
  };

  return { config };
}

export default signOut;
