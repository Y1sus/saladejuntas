import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { DetallesUsuario } from "./detalles_usuario.model";
import { TiposUsuario } from "./tipos_usuario.model";

@Table({
  timestamps: true,
  underscored: true,
  tableName: "usuarios",
  createdAt: "created_at",
  updatedAt: false,
  deletedAt: false,
})
export class Usuario extends Model {
  @Column({
    field: "id_usuario",
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  })
  id_usuario?: number;

  @ForeignKey(() => DetallesUsuario)
  @Column({ allowNull: false })
  id_detalles_usuario?: number;

  @BelongsTo(() => DetallesUsuario)
  detalles_usuario?: DetallesUsuario;

  @ForeignKey(() => TiposUsuario)
  @Column({ allowNull: false })
  id_tipos_usuario?: number;

  @BelongsTo(() => TiposUsuario)
  tipos_usuario?: TiposUsuario;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  active?: number;
}
