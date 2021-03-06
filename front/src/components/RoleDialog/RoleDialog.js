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
          <DialogTitle id="Role-creation-dialog">Cr??er un r??le</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remplissez ce formulaire pour cr??er un nouveau r??le.
            </DialogContentText>
            <div className={classes.container}>
              <TextField
                id="name"
                label="Nom"
                variant="outlined"
                placeholder="Nom du r??le"
                className={classes.inputField}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Le nom du r??le est n??cessaire",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="side">Camp du r??le</InputLabel>
                <Select
                  labelId="side"
                  id="side"
                  {...register("side", {
                    required: {
                      value: true,
                      message: "Le camp du r??le est n??cessaire",
                    },
                  })}
                  error={!!errors.side}
                  helperText={errors.side?.message}
                >
                  <MenuItem value={"SV"}>SV</MenuItem>
                  <MenuItem value={"VillageRole"}>R??le du village</MenuItem>
                  <MenuItem value={"Wolf"}>Loup</MenuItem>
                  <MenuItem value={"WolfRole"}>R??le loup</MenuItem>
                  <MenuItem value={"WolfAffiliate"}>Alli?? des loups</MenuItem>
                  <MenuItem value={"Undecided"}>Ind??cis</MenuItem>
                  <MenuItem value={"Independant"}>Ind??pendant</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              placeholder="Description du r??le"
              fullWidth
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              {...register("description", {
                required: {
                  value: true,
                  message: "La description du r??le est n??cessaire",
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
              Cr??er
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default GMGame;
