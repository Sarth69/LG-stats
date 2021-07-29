import { useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";

import { config as APIConfig } from "../config";

// Disable the same warning as in useCustomQuery
// eslint-disable-next-line
export interface MutationReturnType<TData = void, TError = void> {
  config: AxiosRequestConfig;
}

function useCustomMutation<TVar, TData = void, TError = void>(
  mutation: (vars: TVar) => MutationReturnType<TData, TError>,
  options?: UseMutationOptions<
    AxiosResponse<TData>,
    AxiosError<TError>,
    TVar,
    unknown
  >
): UseMutationResult<AxiosResponse<TData>, AxiosError<TError>, TVar, unknown> {
  const mutationFn = useCallback(
    (variables: TVar) => {
      const { config } = mutation(variables);
      return axios({
        ...config,
        baseURL: APIConfig.API_ROOT,
        withCredentials: true,
      });
    },
    [mutation]
  );

  return useMutation(mutationFn, options);
}

export default useCustomMutation;
