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
  id_tipos_usuario: number;

  @Column({ allowNull: false })
  tipo_usuario?: string;

  @Column({ allowNull: true })
  descripcion_tipo_usuario: string;

  @Column({ allowNull: false })
  active?: number;
}
