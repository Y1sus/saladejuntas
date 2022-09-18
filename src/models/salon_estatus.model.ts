import { Model, Column, Table } from "sequelize-typescript";

/**
 * @class SalonEstatus
 * @extends Model
 * @description Modelo de la tabla salon_estatus
 * @developer Jes´ús Montalvo
 * @version 1.0.0
 * @since 1.0.0
 * @date 2022-09-17
 * @license Owner
 * @language typescript
 * */
@Table({
  tableName: "salon_estatus",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: false,
  deletedAt: false,
})
export class SalonEstatus extends Model {
  @Column({
    field: "id_salon_estatus",
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  })
  private declare id_salon_estatus?: number;

  @Column({ allowNull: false })
  private declare nombre_estatus: string;

  @Column({ allowNull: false })
  private declare active?: number;
}
