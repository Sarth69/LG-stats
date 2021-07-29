import React, { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import Lock from "@material-ui/icons/LockOutlined";
import VisibilityOffOutlined from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";

import meQuery from "../../queries/me";
import loggedInQuery from "../../queries/loggedIn";
import signInMutation from "../../mutations/signIn";
import useCustomMutation from "../../mutations/useCustomMutation";
import ErrorContext from "../../contexts/Error";
import useStyles from "./Login.style";

function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const { setAxiosError } = useContext(ErrorContext);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useCustomMutation(signInMutation);
  const queryClient = useQueryClient();

  const onSubmit = useCallback(
    (data) => {
      mutation.mutate(
        { ...data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(meQuery().key);
            queryClient.invalidateQueries(loggedInQuery().key);
            history.push("/");
          },
          onError: (err) => setAxiosError(err),
        }
      );
    },
    [mutation, history, queryClient, setAxiosError]
  );

  const tooglePasswordVisibility = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  return (
    <div>
      <form id="signin" onSubmit={handleSubmit(onSubmit)}>
        <Paper variant="outlined" className={classes.container}>
          <TextField
            className={classes.inputField}
            label="Email"
            variant="outlined"
            placeholder="Entrez vote email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("email", {
              required: {
                value: true,
                message: "L'e-mail est nécessaire",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Entrez une adresse e-mail correcte",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <div className={classes.inputField}>
            <TextField
              label="Mot de passe"
              variant="outlined"
              placeholder="Entrez votre mot de passe"
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onMouseDown={tooglePasswordVisibility}
                      onMouseUp={tooglePasswordVisibility}
                    >
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("password", {
                required: {
                  value: true,
                  message: "Le mot de passe est nécessaire",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.signButton}
          >
            Se connecter
          </Button>
        </Paper>
      </form>
    </div>
  );
}

export default SignIn;
