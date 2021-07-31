import React, { useContext, useState, useEffect } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import useCustomQuery from "../../queries/useCustomQuery";
import { useQueryClient } from "react-query";
import gameQuery from "../../queries/game";
import playersQuery from "../../queries/players";
import deletePlayerMutation from "../../mutations/deletePlayer";
import newGMMutation from "../../mutations/newGM";
import newPlayerMutation from "../../mutations/newPlayer";
import useCustomMutation from "../../mutations/useCustomMutation";
import ErrorContext from "../../contexts/Error";
import useStyles from "./PlayerList.style";

function PlayerList({ gameID, playerOrGM }) {
  const classes = useStyles();
  const [players, setPlayers] = useState([]);
  const [gm, setGM] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [newGM, setNewGM] = useState("");
  const [, setRerender] = useState(0);

  const { setAxiosError } = useContext(ErrorContext);

  const query = useCustomQuery(gameQuery(gameID));
  const playersQueryResult = useCustomQuery(playersQuery());
  const queryClient = useQueryClient();
  const mutation = useCustomMutation(deletePlayerMutation);
  const newGMMutationResult = useCustomMutation(newGMMutation);
  const newPlayerMutationResult = useCustomMutation(newPlayerMutation);

  useEffect(() => {
    if (query.data && gm.length === 0 && players.length === 0) {
      for (let players_relation of query.data.data.players_relations) {
        if (
          players_relation.role &&
          players_relation.role.name === "Game Master"
        ) {
          gm.push(players_relation);
        } else if (players_relation.player) {
          players.push(players_relation);
        }
      }
      console.log(gm);
      console.log(players);
      setRerender(gm.length);
    }
  }, [query.data, gm, players]);

  const deletePlayer = async (players_relation, playerOrGM) => {
    if (playerOrGM === "GM") {
      if (gm.length === 1) {
        alert("Il doit rester au minimum un MJ dans la partie");
        return;
      }
    }
    console.log("delete");
    console.log(players_relation);
    await mutation.mutate(
      { players_relation: players_relation },
      {
        onSuccess: (data) => {
          console.log("Succès");
          console.log(data.data.data);
          queryClient.setQueryData(["game", gameID], data.data);
          console.log(query.data);
          setPlayers([]);
          setGM([]);
        },
        onError: (err) => setAxiosError(err),
      }
    );
  };

  const handlePlayerChange = (event) => {
    setNewPlayer(event.target.value);
  };

  const handleGMChange = (event) => {
    setNewGM(event.target.value);
  };

  const addNewGM = async () => {
    if (newGM !== "") {
      const alreadyPlayer = query.data.data.players_relations.find(
        (relation) => relation.player && relation.player.id === newGM
      );
      console.log(alreadyPlayer);
      if (alreadyPlayer) {
        alert("Cette personne est déjà joueur ou MJ de la partie");
      } else {
        await newGMMutationResult.mutate(
          { gameID: gameID, playerID: newGM },
          {
            onSuccess: (data) => {
              console.log("Succès");
              queryClient.setQueryData(["game", gameID], data.data);
              setPlayers([]);
              setGM([]);
            },
            onError: (err) => setAxiosError(err),
          }
        );
      }
    }
    console.log(newGM);
    console.log(query.data);
  };

  const addNewPlayer = async () => {
    if (newPlayer !== "") {
      const alreadyPlayer = query.data.data.players_relations.find(
        (relation) => relation.player && relation.player.id === newGM
      );
      console.log(alreadyPlayer);
      if (alreadyPlayer) {
        alert("Cette personne est déjà joueur ou MJ de la partie");
      } else {
        await newPlayerMutationResult.mutate(
          { gameID: gameID, playerID: newPlayer },
          {
            onSuccess: (data) => {
              console.log("Succès");
              queryClient.setQueryData(["game", gameID], data.data);
              setPlayers([]);
              setGM([]);
            },
            onError: (err) => setAxiosError(err),
          }
        );
      }
    }
    console.log(newPlayer);
    console.log(query.data);
  };

  return (
    <div className={classes.root}>
      <List dense className={classes.list}>
        {playerOrGM === "Player" &&
          (players.length > 0 ? (
            players.map((players_relation, index) => {
              if (players_relation.player) {
                return (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        index +
                        1 +
                        " - " +
                        players_relation.player.first_name +
                        " @" +
                        players_relation.player.tl_nickname
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          deletePlayer(players_relation, "Player");
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              } else {
                return null;
              }
            })
          ) : (
            <Typography className={classes.noPlayer}>
              Aucun joueur inscrit
            </Typography>
          ))}
        {playersQueryResult.data && playerOrGM === "Player" && (
          <ListItem key={players.length}>
            <FormControl className={classes.formControl}>
              <InputLabel id="addPlayer">Nouveau joueur</InputLabel>
              <Select
                labelId="addPlayer"
                id="addPlayer"
                value={newPlayer}
                onChange={handlePlayerChange}
              >
                {playersQueryResult.data.data.map((player) => {
                  return (
                    <MenuItem value={player.id}>
                      {player.first_name + " @" + player.tl_nickname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add Player"
                onClick={() => {
                  addNewPlayer();
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {playerOrGM === "GM" &&
          (gm.length > 0 ? (
            gm.map((players_relation, index) => {
              return (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemText
                    primary={
                      index +
                      1 +
                      " - " +
                      players_relation.player.first_name +
                      " @" +
                      players_relation.player.tl_nickname
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        deletePlayer(players_relation, "GM");
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <Typography className={classes.noPlayer}>
              Aucun MJ inscrit
            </Typography>
          ))}
        {playersQueryResult.data && playerOrGM === "GM" && (
          <ListItem key={gm.length}>
            <FormControl className={classes.formControl}>
              <InputLabel id="addGM">Nouveau MJ</InputLabel>
              <Select
                labelId="addGM"
                id="addGM"
                value={newGM}
                onChange={handleGMChange}
              >
                {playersQueryResult.data.data.map((player) => {
                  return (
                    <MenuItem value={player.id}>
                      {player.first_name + " @" + player.tl_nickname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add GM"
                onClick={() => {
                  addNewGM();
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default PlayerList;
