import { Joi } from "celebrate";

export const GameIDSchema = Joi.object()
  .keys({
    id: Joi.string().required(),
  })
  .meta({ className: "GameID" });
