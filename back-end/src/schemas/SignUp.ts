import { Joi } from "celebrate";

export const SignUpSchema = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    tl_nickname: Joi.string().required(),
    password: Joi.string().required(),
  })
  .meta({ className: "SignUp" });
