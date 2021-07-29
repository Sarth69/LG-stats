import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseQueryResult,
} from "react-query";

import { config as apiConfig } from "../config";

// Disable the warning about the unused TData type.
// The type is actually used to pass the type of the
// axios response to the useCustomQuery hook.
// eslint-disable-next-line
export interface QueryReturnType<TQueryKey, TData> {
  key: TQueryKey;
  config: AxiosRequestConfig;
  external?: boolean; // True if fetching data on a different back that ours, false otherwise
}

export function generateAxiosConfig(
  config: AxiosRequestConfig,
  external: boolean
): AxiosRequestConfig {
  if (external) {
    return config;
  }
  return { ...config, baseURL: apiConfig.API_ROOT, withCredentials: true };
}

function useCustomQuery<TQueryKey extends QueryKey, TData>(
  queryConfig: QueryReturnType<TQueryKey, TData>,
  options?: UseQueryOptions<
    AxiosResponse<TData>,
    unknown,
    AxiosResponse<TData>,
    TQueryKey
  >
): UseQueryResult<AxiosResponse<TData>, unknown> {
  const { key, config, external } = queryConfig;

  const finalConfig = generateAxiosConfig(config, !!external);

  return useQuery(key, () => axios(finalConfig), options);
}

export default useCustomQuery;
