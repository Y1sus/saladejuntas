import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Salon } from "./salon.model";
import { Usuario } from "./usuario.model";

@Table({
  tableName: "reservacion",
  underscored: true,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  deletedAt: false,
})
export class Reservacion extends Model {
  @Column({
    field: "id_reservacion",
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  })
  id_reservacion?: number;

  @ForeignKey(() => Usuario)
  @Column({ allowNull: false })
  id_usuario?: number;

  @BelongsTo(() => Usuario)
  usuario?: Usuario;

  @ForeignKey(() => Salon)
  @Column({ allowNull: false })
  id_salon?: number;

  @BelongsTo(() => Salon)
  salon?: Salon;

  @Column({ allowNull: false })
  hora_inicial?: string;

  @Column({ allowNull: false })
  hora_final?: string;

  @Column({ allowNull: false })
  active?: number;
}
