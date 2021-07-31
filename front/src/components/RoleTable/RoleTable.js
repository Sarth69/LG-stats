import React, { useState, useEffect, useContext } from "react";
import useStyles from "./RoleTable.style";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import gameQuery from "../../queries/game";
import useCustomQuery from "../../queries/useCustomQuery";
import { useQueryClient } from "react-query";
import deleteRole from "../../mutations/deleteRole";
import useCustomMutation from "../../mutations/useCustomMutation";
import ErrorContext from "../../contexts/Error";

function RoleTable({ gameID, rows, setRows }) {
  const classes = useStyles();

  const query = useCustomQuery(gameQuery(gameID));
  const queryClient = useQueryClient();
  const mutation = useCustomMutation(deleteRole);

  const { setAxiosError } = useContext(ErrorContext);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0]);

  const [, setRerender] = useState(0);

  useEffect(() => {
    if (query.data && rows.length === 0) {
      setCounts([0, 0, 0, 0, 0, 0, 0]);
      for (let players_relation of query.data.data.players_relations) {
        if (
          players_relation.role &&
          players_relation.role.name !== "Game Master"
        ) {
          let side;
          if (players_relation.role.side === "SV") {
            side = 0;
          } else if (players_relation.role.side === "VillageRole") {
            side = 1;
          } else if (players_relation.role.side === "Wolf") {
            side = 2;
          } else if (players_relation.role.side === "WolfRole") {
            side = 3;
          } else if (players_relation.role.side === "WolfAffiliate") {
            side = 4;
          } else if (players_relation.role.side === "Independant") {
            side = 5;
          } else {
            side = 6;
          }
          console.log(side);
          if (rows.length <= counts[side]) {
            rows.push([
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
            ]);
          }
          let count = 1;
          for (let row of rows) {
            if (row[side] && row[side].role === players_relation.role.name) {
              count += 1;
            }
          }
          console.log(count);
          console.log(counts[side]);
          console.log(rows[counts[side] - 1]);
          console.log(rows);
          if (count === 2) {
            for (let i = 0; i < rows.length; i++) {
              if (
                rows[i][side] &&
                rows[i][side].role === players_relation.role.name
              ) {
                rows[i][side].count = 1;
              }
            }
          }
          if (count === 1) {
            rows[counts[side]][side] = {
              role: players_relation.role.name,
              count: 0,
            };
          } else {
            rows[counts[side]][side] = {
              role: players_relation.role.name,
              count: count,
            };
          }

          counts[side] += 1;
        }
      }
      setRerender(rows.length);
    }
  }, [query.data, rows, counts]);

  const removeRole = async (role) => {
    await mutation.mutate(
      { name: role, gameID: gameID },
      {
        onSuccess: (data) => {
          console.log("Succès");
          queryClient.setQueryData(["game", gameID], data.data);
          setRows([]);
          setCounts([0, 0, 0, 0, 0, 0, 0]);
        },
        onError: (err) => setAxiosError(err),
      }
    );
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.paper}>
        <Table aria-label="tableau composition" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.SV}>
                SV
              </TableCell>
              <TableCell align="center" className={classes.villageRole}>
                Rôles du village
              </TableCell>
              <TableCell align="center" className={classes.wolf}>
                Loups
              </TableCell>
              <TableCell align="center" className={classes.wolfRole}>
                Rôles loups
              </TableCell>
              <TableCell align="center" className={classes.wolfAffiliate}>
                Alliés des loups
              </TableCell>
              <TableCell align="center" className={classes.independant}>
                Indépendants
              </TableCell>
              <TableCell align="center" className={classes.undecided}>
                Indécis
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.countRow}>
              {counts.map((count) => (
                <TableCell align="center">{count}</TableCell>
              ))}
            </TableRow>
            {rows.map((row) => (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  className={row[0] && classes.SV}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[0] &&
                        row[0].role +
                          " " +
                          (row[0].count && row[0].count !== 0
                            ? row[0].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[0] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[0].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell
                  align="center"
                  className={row[1] && classes.villageRole}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[1] &&
                        row[1].role +
                          " " +
                          (row[1].count && row[1].count !== 0
                            ? row[1].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[1] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[1].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center" className={row[2] && classes.wolf}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[2] &&
                        row[2].role +
                          " " +
                          (row[2].count && row[2].count !== 0
                            ? row[2].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[2] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[2].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell
                  align="center"
                  className={row[3] && classes.wolfRole}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[3] &&
                        row[3].role +
                          " " +
                          (row[3].count && row[3].count !== 0
                            ? row[3].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[3] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[3].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell
                  align="center"
                  className={row[4] && classes.wolfAffiliate}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[4] &&
                        row[4].role +
                          " " +
                          (row[4].count && row[4].count !== 0
                            ? row[4].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[4] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[4].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell
                  align="center"
                  className={row[5] && classes.independant}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[5] &&
                        row[5].role +
                          " " +
                          (row[5].count && row[5].count !== 0
                            ? row[5].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[5] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[5].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell
                  align="center"
                  className={row[6] && classes.undecided}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12}>
                      {row[6] &&
                        row[6].role +
                          " " +
                          (row[6].count && row[6].count !== 0
                            ? row[6].count
                            : "")}
                    </Grid>
                    <Grid xs={12}>
                      {row[6] && (
                        <IconButton
                          edge="center"
                          aria-label="remove Role"
                          onClick={() => {
                            removeRole(row[6].role);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RoleTable;
