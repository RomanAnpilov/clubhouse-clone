import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { nanoid } from "nanoid";
import { Codes } from "../models";

declare global {
  namespace Express {
    interface User extends UserData {}
  }
}

dotenv.config({
  path: "server/.env",
});

import "./core/db";

import { passport } from "./core/passport";
import { UserData } from "../pages";
import axios from "axios";

const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, "public/avatars/");
    },
    filename: function (_, file, cb) {
      cb(
        null,
        file.fieldname + "-" + nanoid(6) + "." + file.mimetype.split("/").pop()
      );
    },
  }),
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    res.json(req.user);
  })
);

app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename}`,
  });
});

const randomCode = (max: number = 9999, min: number = 1000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.get(
  "/auth/sms/activate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
        return res.send("Succes activated")
      } else {
        throw new Error("User not found")
      }
    } catch (err) {
      res.status(500).json({ message: "Error with accout activation" + err });
    }
  }
);

app.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = randomCode();

    console.log("agagaga", req.user);

    if (!phone) {
      res.status(400).send();
    }

    try {
      // const data = await axios.get(
      //   `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=79149450581&msg=${smsCode}`
      // );

      await Codes.create({
        code: smsCode,
        user_id: userId,
      });

      res.status(200).json({ message: "ALL GOOD" });
    } catch (err) {
      res.status(500).json({ message: "Error when sending SMS" + err });
    }
  }
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user
      )}','*');window.close();</script>`
    );
  }
);

app.listen(3002, () => {
  console.log("SERVER RUNNED");
});
