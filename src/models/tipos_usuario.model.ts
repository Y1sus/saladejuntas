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

// Clase que representa la tabla tipo de usuario en la base de datos
@Table({
  tableName: "tipos_usuario",
  underscored: true,
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
})
export class TiposUsuario extends Model {
  @Column({
    field: "id_tipos_usuario",
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  })
  private declare id_tipos_usuario: number;

  @Column({ allowNull: false })
  private declare tipo_usuario: string;

  @Column({ allowNull: true })
  private declare descripcion_tipo_usuario: string;

  @Column({ allowNull: false })
  private declare active?: number;
}
