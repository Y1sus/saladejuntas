import { model, Schema, Document, now } from "mongoose";

/**
 * @schema logPeticionesSchema
 * @description Esquema de la colección de logs de peticiones
 * @developer Jes´ús Montalvo
 * @version 1.0.0
 * @since 1.0.0
 * @date 2022-09-17
 * @license Owner
 */
export interface ILogPeticiones extends Document {
  host: string;
  "user-agent": string;
  authorization: string;
  accept: string;
  fecha: Date;
  method: string;
  statusCode: string;
  statusMessage: string;
  originalUrl: string;
}

const logPeticionesSchema = new Schema({
  host: {
    type: String,
  },
  "user-agent": {
    type: String,
  },
  authorization: {
    type: String,
  },
  accept: {
    type: String,
  },
  fecha: {
    type: Date,
    trim: true,
    default: now(),
  },
  method: {
    type: String,
  },
  statusCode: {
    type: String,
  },
  statusMessage: {
    type: String,
  },
  originalUrl: {
    type: String,
  },
});
export default model<ILogPeticiones>("logPeticiones", logPeticionesSchema);
