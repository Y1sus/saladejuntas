import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { SalonEstatus } from "./salon_estatus.model";

/**
 * @class Salon
 * @extends Model
 * @description Modelo de la tabla salon
 * @developer Jes´ús Montalvo
 * @version 1.0.0
 * @since 1.0.0
 * @date 2022-09-17
 * @license Owner
 * @language typescript
 * */

// Clase que representa la tabla salon en la base de datos
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
  private declare id_salon?: number;

  @Column({ allowNull: false })
  private declare nombre_salon: string;

  @Column({ allowNull: false })
  private declare descripcion_salon?: string;

  @ForeignKey(() => SalonEstatus)
  @Column({ allowNull: false })
  private declare id_salon_estatus?: number;

  @BelongsTo(() => SalonEstatus)
  private declare salon_estatus?: SalonEstatus;

  @Column({ allowNull: false })
  private declare active: number;
}
