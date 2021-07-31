import React, { useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import useStyles from "./RoleDialog.style";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import useCustomMutation from "../../mutations/useCustomMutation";
import { useQueryClient } from "react-query";
import roleMutation from "../../mutations/role";
import ErrorContext from "../../contexts/Error";

function GMGame({ handleDialogClose, open }) {
  const classes = useStyles();
  const { setAxiosError } = useContext(ErrorContext);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useCustomMutation(roleMutation);
  const queryClient = useQueryClient();

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      mutation.mutate(
        { ...data },
        {
          onSuccess: (data) => {
            console.log("Success");
            queryClient.setQueryData(["role"], data.data);
            unregister("name");
            unregister("description");
            unregister("side");
            handleDialogClose();
          },
          onError: (err) => setAxiosError(err),
        }
      );
    },
    [mutation, setAxiosError, handleDialogClose, unregister, queryClient]
  );

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="Role-creation-dialog"
      >
        <form id="newRole" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="Role-creation-dialog">Créer un rôle</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remplissez ce formulaire pour créer un nouveau rôle.
            </DialogContentText>
            <div className={classes.container}>
              <TextField
                id="name"
                label="Nom"
                variant="outlined"
                placeholder="Nom du rôle"
                className={classes.inputField}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Le nom du rôle est nécessaire",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="side">Camp du rôle</InputLabel>
                <Select
                  labelId="side"
                  id="side"
                  {...register("side", {
                    required: {
                      value: true,
                      message: "Le camp du rôle est nécessaire",
                    },
                  })}
                  error={!!errors.side}
                  helperText={errors.side?.message}
                >
                  <MenuItem value={"SV"}>SV</MenuItem>
                  <MenuItem value={"VillageRole"}>Rôle du village</MenuItem>
                  <MenuItem value={"Wolf"}>Loup</MenuItem>
                  <MenuItem value={"WolfRole"}>Rôle loup</MenuItem>
                  <MenuItem value={"WolfAffiliate"}>Allié des loups</MenuItem>
                  <MenuItem value={"Undecided"}>Indécis</MenuItem>
                  <MenuItem value={"Independant"}>Indépendant</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              placeholder="Description du rôle"
              fullWidth
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              {...register("description", {
                required: {
                  value: true,
                  message: "La description du rôle est nécessaire",
                },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              className={classes.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Fermer
            </Button>
            <Button type="submit" color="primary">
              Créer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default GMGame;
