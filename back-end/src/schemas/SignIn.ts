import { Joi } from "celebrate";

export const SignInSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  .meta({ className: "SignIn" });
