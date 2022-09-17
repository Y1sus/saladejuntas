import { Model, Column, Table } from "sequelize-typescript";

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
