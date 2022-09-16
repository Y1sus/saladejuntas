import { sequelize } from "../database/database";
import { Op } from "sequelize";
import cron from "node-cron";
import { Reservacion } from "../models/reservacion.model";

export class NodeCron {
  private reservacionRepo = sequelize.getRepository(Reservacion);
  callCron() {
    return cron.schedule("*/1 * * * *", async () => {
      var time = this.getTime();
      await this.buscarReservacion(time);
    });
  }

  private async buscarReservacion(time: string) {
    var ids_reservacion: Array<number | undefined> = [];
    const reservacion = await this.reservacionRepo.findAll({
      where: {
        hora_final: time,
        active: 1,
      },
      raw: true,
      attributes: ["id_reservacion"],
    });
    if (reservacion.length > 0) {
      reservacion.map((reservacion) => {
        ids_reservacion.push(reservacion.id_reservacion);
      });
      await this.updateValues(ids_reservacion);
    }
  }

  private async updateValues(ids_reservacion: Array<number | undefined>) {
    await this.reservacionRepo
      .update(
        {
          active: 0,
        },
        {
          where: {
            id_reservacion: {
              [Op.in]: ids_reservacion,
            },
          },
        }
      )
      .then(() => {
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
