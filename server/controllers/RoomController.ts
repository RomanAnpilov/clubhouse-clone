import express from "express";
import { Room } from "../../models";

class RoomController {
  async index(req: express.Request, res: express.Response) {
    try {
      const items = await Room.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).send("Error !!! " + error);
    }
  }

  async create(req: express.Request, res: express.Response) {
    try {
      const data = {
        title: req.body.title,
        type: req.body.type,
      };

      if (!data.title || !data.type) {
        return res
          .status(400)
          .json({ message: "Отсутствует заголовок или тип комнаты" });
      }
      const room = await Room.create(data);
      res.json(room);
    } catch (error) {
      res.status(500).send("Комната не была создана");
    }
  }

  async show(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id;

      if (isNaN(Number(roomId))) {
        return res.status(400).json({ message: "Неверный id комнаты" });
      }

      const room = await Room.findByPk(roomId);

      if (!room) {
        return res.status(404).json({ message: "Комната не найдена" });
      }

      res.json(room);
    } catch (error) {
      res.status(500).send("Ошибка в поиске комнаты " + error);
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id;

      if (isNaN(Number(roomId))) {
        return res.status(400).json({ message: "Неверный id комнаты" });
      }

      await Room.destroy({ where: { id: roomId } })

      res.send("EEE, delete room");
    } catch (error) {
      res.status(500).send("Ошибка в поиске комнаты " + error);
    }
  }
}

export default new RoomController();
