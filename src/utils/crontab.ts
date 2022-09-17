import { sequelize } from "../database/database";
import { Op } from "sequelize";
import cron from "node-cron";
import { Reservacion } from "../models/reservacion.model";
import { Salon } from "../models/salon.model";

export class NodeCron {
  private reservacionRepo = sequelize.getRepository(Reservacion);
  private salonRepo = sequelize.getRepository(Salon);
  callCron() {
    return cron.schedule("*/1 * * * *", async () => {
      var time = this.getTime();
      await this.buscarReservacion(time);
    });
  }

  private async buscarReservacion(time: string) {
    var ids_reservacion: Array<number | undefined> = [];
    var ids_salones: Array<number | undefined> = [];
    const reservacion = await this.reservacionRepo.findAll({
      where: {
        hora_final: time,
        active: 1,
      },
      raw: true,
      attributes: ["id_reservacion", "id_salon"],
    });
    if (reservacion.length > 0) {
      reservacion.map((reservacion) => {
        ids_reservacion.push(reservacion.id_reservacion);
        ids_salones.push(reservacion.id_salon);
      });
      await this.updateValues(ids_reservacion, ids_salones);
    }
  }

  private async updateValues(
    ids_reservacion: Array<number | undefined>,
    ids_salones: Array<number | undefined>
  ) {
    console.log(
      "ids_salones => ",
      ids_salones,
      " ids_reservaciones => ",
      ids_reservacion
    );
    await this.reservacionRepo
      .update(
        {
          active: 0,
        },
        {
          where: {
            active: 1,
            id_reservacion: {
              [Op.in]: ids_reservacion,
            },
          },
        }
      )
      .then(async () => {
        await this.salonRepo
          .update(
            {
              id_salon_estatus: 1,
            },
            {
              where: {
                active: 1,
                id_salon: {
                  [Op.in]: ids_salones,
                },
              },
            }
          )
          .catch((err) => {
            console.log("Ocurrió un error al actualizar los salones => ", err);
          });

        console.log(`Reservaciones terminadas`);
      })
      .catch((err) => {
        console.log(`No se pudieron cancelar las reservaciones => ${err}`);
        return true;
      });
  }

  private getTime(): string {
    var dateTime = new Date();
    var hour = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();

    var currTime = hour + ":" + min + ":" + sec;
    return currTime;
  }
}
