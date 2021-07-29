import { AxiosRequestConfig } from "axios";

import { QueryReturnType } from "./useCustomQuery";

export interface GameResponse {
  id: number;
  start_date: Date | undefined;
  end_date: Date | undefined;
  comments: string | undefined;
  status: string | undefined;
  players_relations: Players_relations;
}

export interface Players_relations {
  id: number;
  player: Player;
  role: Role;
  win: boolean | undefined;
}

export interface Role {
  id: number;
  name: string;
  description: string | undefined;
  side: string;
}

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
function gameQuery(id: string): QueryReturnType<string[], GameResponse> {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `/game/${id}`,
  };
  return { key: ["game", id], config };
}

export default gameQuery;
