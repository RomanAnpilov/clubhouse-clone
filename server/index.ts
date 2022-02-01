import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { passport } from "./core/passport";
import { upload } from "./core/upload";

dotenv.config({
  path: "server/.env",
});

import "./core/db";
import AuthController from "./controllers/AuthController";

console.log(typeof process.env.DB_PASSWORD)

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Регистрация через гит
app.get("/auth/github", passport.authenticate("github"));

// Получение данных о профиле
app.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }), AuthController.getMe);

// Активация через смс код
app.get(
  "/auth/sms/activate",
  passport.authenticate("jwt", { session: false }),
  AuthController.activate
);

// Загрузка фото на сервер
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename}`,
  });
});

// Отправка смс кода для подтверждения
app.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  AuthController.sendSMS
);

// Callback в окне при регистрации
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  AuthController.authCallback
);

app.listen(3002, () => {
  console.log("SERVER RUNNED");
});
