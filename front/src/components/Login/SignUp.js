import { Button, IconButton, Tooltip } from "@material-ui/core";
import React, { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";

import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Create from "@material-ui/icons/CreateOutlined";
import HelpOutlined from "@material-ui/icons/HelpOutlineOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import Lock from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import VisibilityOffOutlined from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";
import signUpMutation from "../../mutations/signUp";
import useCustomMutation from "../../mutations/useCustomMutation";
import useStyles from "./Login.style";
import ErrorContext from "../../contexts/Error";

function SignUp({ setHasAccount }) {
  const classes = useStyles();

  const { setAxiosError } = useContext(ErrorContext);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useCustomMutation(signUpMutation);

  const onSubmit = useCallback(
    (data) => {
      mutation.mutate(
        { ...data },
        {
          onSuccess: () => setHasAccount(true),
          onError: (err) => setAxiosError(err),
        }
      );
    },
    [mutation, setAxiosError, setHasAccount]
  );

  const tooglePasswordVisibility = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  return (
    <div>
      <form id="SignUp" onSubmit={handleSubmit(onSubmit)}>
        <Paper variant="outlined" className={classes.container}>
          <TextField
            className={classes.inputField}
            label="Email"
            variant="outlined"
            placeholder="Entrez votre email"
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
                message: "L'email est nécessaire",
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Rentrez un email valide",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            className={classes.inputField}
            label="Prénom"
            variant="outlined"
            placeholder="Entrez votre prénom"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Create />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("firstName", {
              required: {
                value: true,
                message: "Le prénom est nécessaire",
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            className={classes.inputField}
            label="Nom"
            variant="outlined"
            placeholder="Entrez votre nom"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Create />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("lastName", {
              required: {
                value: true,
                message: "Le nom est nécessaire",
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            className={classes.inputField}
            label="@Télégram"
            variant="outlined"
            placeholder="Entrez votre @ télégram"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("tl_nickname", {
              required: {
                value: true,
                message: "Le @ télégram est nécessaire",
              },
            })}
            error={!!errors.tl_nickname}
            helperText={errors.tl_nickname?.message}
          />

          <TextField
            InputLabelProps={{ style: { pointerEvents: "auto" }, shrink: true }}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                Mot de passe
                <Tooltip title="Votre mot de passe doit contenir au moint: 1 Majuscule, 1 Minuscule, 1 caractère spécial, 1 chiffre et doit faire plus de 8 caractères.">
                  <HelpOutlined />
                </Tooltip>
              </div>
            }
            className={classes.inputField}
            placeholder="Entrez votre mot de passe"
            variant="outlined"
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
            {...register("password", {
              required: {
                value: true,
                message: "Le mot de passe est nécessaire",
              },
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message: "Entrez un mot de passe valide",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button variant="contained" color="secondary" type="submit">
            S'inscrire
          </Button>
        </Paper>
      </form>
    </div>
  );
}

export default SignUp;
