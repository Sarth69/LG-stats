import { Joi } from "celebrate";

export const NewRoleSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    side: Joi.string().required(),
  })
  .meta({ className: "SignIn" });
