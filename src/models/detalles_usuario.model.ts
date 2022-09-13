import { Table, Column, Model } from "sequelize-typescript";

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
  id_detalles_usuario?: number;

  @Column({ allowNull: false })
  nombre?: string;

  @Column({ allowNull: false })
  apellidos?: string;

  @Column({ allowNull: false })
  domicilio?: string;

  @Column({ allowNull: false })
  telefono?: string;

  @Column({ allowNull: false })
  edad?: number;

  @Column({ allowNull: false })
  created_at?: Date;

  @Column({ allowNull: false })
  updated_at?: Date;

  @Column({ allowNull: false })
  deleted_at?: Date;

  @Column({ allowNull: false })
  active?: number;
}
