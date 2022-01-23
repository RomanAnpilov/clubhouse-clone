import express from "express";
import { Codes } from "../../models";
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
    const userId = req.user.id.toString();
    const smsCode = req.query.code.toString();

    if (!smsCode) {
      return res.status(400).send();
    }

    const whereQuery = { code: smsCode, user_id: userId };

    try {
      const findCode = await Codes.findOne({
        where: whereQuery,
      });

      if (findCode) {
        await Codes.destroy({
          where: whereQuery,
        });
        return res.send("Succes activated");
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      res.status(500).json({ message: "Error with accout activation" + err });
    }
  }

  async sendSMS(req: express.Request, res: express.Response) {
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = String(generateRandomCode());

    console.log(typeof smsCode)
    if (!phone) {
      res.status(400).send();
    }

    try {
      // const data = await axios.get(
      //   `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=79149450581&msg=${smsCode}`
      // );

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
      res.status(500).json({ message: "Error when sending SMS" + err });
    }
  }
}

export default new AuthController();
