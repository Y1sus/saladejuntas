import { Model, Column, Table } from "sequelize-typescript";

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
