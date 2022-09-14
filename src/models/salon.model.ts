import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { SalonEstatus } from "./salon_estatus.model";

@Table({
  tableName: "salon",
  underscored: true,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  deletedAt: false,
})
export class Salon extends Model {
  @Column({
    field: "id_salon",
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  })
  id_salon?: number;

  @Column({ allowNull: false })
  nombre_salon: string;

  @Column({ allowNull: false })
  descripcion_salon?: string;

  @ForeignKey(() => SalonEstatus)
  @Column({ allowNull: false })
  id_salon_estatus?: number;

  @BelongsTo(() => SalonEstatus)
  salon_estatus?: SalonEstatus;

  @Column({ allowNull: false })
  private active: number;
}
