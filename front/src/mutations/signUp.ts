import { AxiosRequestConfig } from "axios";
import { MutationReturnType } from "./useCustomMutation";

import { FormValues } from "./signIn";
import { ErrorMessage } from "./signIn";

function signUp(data: FormValues): MutationReturnType<void, ErrorMessage> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "/login/signup",
    data: data,
  };

  return { config };
}

export default signUp;
