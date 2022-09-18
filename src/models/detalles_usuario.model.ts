import { Table, Column, Model } from "sequelize-typescript";

/** 
 * @class DetallesUsuario
 * @extends Model
 * @description Modelo de la tabla detalles_usuario
 * @developer Jes´ús Montalvo
 * @version 1.0.0
 * @since 1.0.0
 * @date 2022-09-17
 * @license Owner
 * @language typescript
 */
// la clase DetallesUsuario es la encargada de crear la tabla detalles_usuario en la base de datos de mysql
// esta clase hereda de la clase Model de la librería sequelize-typescript.
@Table({
  timestamps: true,
  underscored: true,
  tableName: "detalles_usuario",
  createdAt: "created_at",
  updatedAt: false,
  deletedAt: false,
})
export class DetallesUsuario extends Model {
  @Column({
    field: "id_detalles_usuario",
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  })
  declare id_detalles_usuario?: number;

  @Column({ allowNull: false })
  private declare nombre: string;

  @Column({ allowNull: false })
  private declare apellidos: string;

  @Column({ allowNull: false })
  private declare domicilio: string;

  @Column({ allowNull: false })
  private declare telefono: string;

  @Column({ allowNull: false })
  private declare edad?: number;

  @Column({ allowNull: false })
  private declare created_at?: Date;

  @Column({ allowNull: true })
  private declare updated_at?: Date;

  @Column({ allowNull: true })
  private declare deleted_at?: Date;

  @Column({ allowNull: true })
  private declare active?: number;
}
