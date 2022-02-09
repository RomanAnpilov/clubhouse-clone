import express from "express";
import axios from "axios";
import { Codes, User } from "../../models";
import { generateRandomCode } from "../utils/generateRandomCode";

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  authCallback(req: express.Request, res: express.Response) {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user
      )}','*');window.close();</script>`
    );
  }

  async activate(req: express.Request, res: express.Response) {
    const userId = String(req.user.id);
    const {user, code} = req.body;

    if (!code) {
      return res.status(400).send();
    }

    const whereQuery = { code: code, user_id: userId };

    try {
      const findCode = await Codes.findOne({
        where: whereQuery,
      });

      if (findCode) {
        await Codes.destroy({
          where: whereQuery,
        });
        await User.update({...user, isActive: 1}, {where: {id: userId}})
        return res.send("Succes activated");
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      res.status(500).json({ message: "Error with accout activation" + err });
      console.log(err)
    }
  }

  async sendSMS(req: express.Request, res: express.Response) {
    const phone = req.query.phone;
    const userId = String(req.user.id);
    const smsCode = String(generateRandomCode());
    console.log("phone",phone)
    // if (!phone) {
    //   res.json({message: "Номер телефона не указан"})
    // }

    try {
      // SEND SMS
      const data = await axios.get(
        `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=${smsCode}`
      );
      // console.log("SMS", data)

      const findCode = await Codes.findOne({
        where: {
          user_id: userId,
        }
      })

      if (findCode) {
        return res.json({message: "Code send before"}).status(400)
      }

      await Codes.create({
        code: smsCode,
        user_id: userId,
      });

      res.status(200).json({ message: "ALL GOOD" });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error when sending SMS" + err });
    }
  }
}

export default new AuthController();
