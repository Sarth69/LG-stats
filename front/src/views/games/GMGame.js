import React, { useContext, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useStyles from "./Game.style";
import { useParams } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";

import gameQuery from "../../queries/game";
import useCustomQuery from "../../queries/useCustomQuery";
import datesMutation from "../../mutations/date";
import useCustomMutation from "../../mutations/useCustomMutation";
import ErrorContext from "../../contexts/Error";
import PlayerList from "../../components/PlayerList/PlayerList";

function GMGame() {
  const classes = useStyles();
  let { id } = useParams();
  const { setAxiosError } = useContext(ErrorContext);
  const [newRole, setNewRole] = useState("");

  const query = useCustomQuery(gameQuery(id.toString()));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useCustomMutation(datesMutation);

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const onSubmit = useCallback(
    (data) => {
      mutation.mutate(
        { ...data, gameID: query.data.data.id },
        {
          onSuccess: () => {
            console.log("Success");
          },
          onError: (err) => setAxiosError(err),
        }
      );
    },
    [mutation, setAxiosError, query.data]
  );

  const convertDate = (date) => {
    const newDate = date.toString();
    const year = newDate.substring(0, 4);
    const month = newDate.substring(5, 7);
    const day = newDate.substring(8, 10);
    const hours = newDate.substring(11, 13);
    const minutes = newDate.substring(14, 16);
    console.log(date);
    return day + "/" + month + "/" + year + " à " + hours + ":" + minutes;
  };

  const nbRolesToAdd = () => {
    let nbRolesInComp = 0;
    let nbPlayers = 0;
    for (let player of query.data.data.players_relations) {
      if ((player.role && player.role.name !== "Game Master") || !player.role) {
        if (player.role) {
          console.log(player.role);
          nbRolesInComp += 1;
        } else {
          nbPlayers += 1;
        }
      }
    }
    return nbPlayers - nbRolesInComp;
  };

  const addNewRole = async () => {
    console.log(newRole);
  };

  return (
    <div className={classes.root}>
      <form id="dates" onSubmit={handleSubmit(onSubmit)}>
        <Paper variant="outlined" className={classes.container}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography className={classes.title}>
                {"Partie n°" + id}
              </Typography>
              {query.data && (
                <Typography>{"Status: " + query.data.data.status}</Typography>
              )}
              {query.data && query.data.data.start_date && (
                <Typography>
                  {"Fin des inscriptions: " +
                    convertDate(query.data.data.start_date)}
                </Typography>
              )}
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.container}
            >
              <Grid item xs={12} sm={6} className={classes.container}>
                <TextField
                  id="datetime-local"
                  label="Fin des inscriptions"
                  type="datetime-local"
                  variant="outlined"
                  placeholder="Entrez la date de fin des inscriptions"
                  className={classes.inputField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("start_date", {
                    required: {
                      value: true,
                      message:
                        "La date de fin des inscriptions et début de la partie est nécessaire",
                    },
                  })}
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.container}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className={classes.signButton}
                >
                  {query.data && query.data.data.start_date
                    ? "Mettre à jour la date"
                    : "Valider la date"}
                </Button>
              </Grid>
            </Grid>

            <Grid item container direction="row">
              <Grid
                item
                container
                xs={12}
                sm={9}
                justifyContent="center"
                alignItems="center"
                className={classes.rolesButtonsContainer}
              >
                <Grid item xs={12} sm={3}>
                  <Typography className={classes.title}>
                    {(query.data && nbRolesToAdd()) + " rôle manquant"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      console.log("open dialog");
                    }}
                    className={classes.signButton}
                  >
                    Créer un rôle
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List dense className={classes.list}>
                    <ListItem>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="addRole">
                          Ajouter un rôle à la composition
                        </InputLabel>
                        <Select
                          labelId="addRole"
                          id="addRole"
                          value={newRole}
                          onChange={handleRoleChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                      </FormControl>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="add Role"
                          onClick={() => {
                            addNewRole();
                          }}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  Tableau
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.playerList}>
                  <Typography className={classes.title}>
                    Liste des joueurs inscrits
                  </Typography>
                  <PlayerList gameID={id.toString()} playerOrGM="Player" />
                </div>
                <div className={classes.playerList}>
                  <Typography className={classes.title}>
                    Liste des MJ
                  </Typography>
                  <PlayerList gameID={id.toString()} playerOrGM="GM" />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}

export default GMGame;
