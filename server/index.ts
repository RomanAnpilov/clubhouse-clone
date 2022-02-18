import express from "express";
import dotenv from "dotenv";
import socket from "socket.io";
import {createServer} from "http";
import cors from "cors";
import { passport } from "./core/passport";
import { upload } from "./core/upload";
import {Room} from "../models"

dotenv.config({
  path: "server/.env",
});

import "./core/db";
import AuthController from "./controllers/AuthController";
import RoomController from "./controllers/RoomController";
import { getUsersFromRoom, SocketRoom } from "../utils/getUsersFroomRoom";

const app = express();
const server = createServer(app);
const io = socket(server, {
  cors: {
    origin: '*',
  },
});

const rooms: SocketRoom = {};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('CLIENT@ROOMS:JOIN', ({user,roomId}) => {
    socket.roomId = roomId;
    
    console.log("USER CONNECT TO ROOM!", roomId);

    socket.join(`room/${roomId}`)
    rooms[socket.id] = {roomId, user};
    const users = getUsersFromRoom(rooms, roomId);
    io.in(`room/${roomId}`).emit('SERVER@ROOMS:JOIN', users)
    
    Room.update({speakers: users}, {where: {id: roomId}})
  })

  socket.on("disconnect", () => {
    console.log(rooms)
    if (rooms[socket.id]) {
      const {roomId, user} = rooms[socket.id];
      socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:LEAVE', user)
      delete rooms[socket.id];
      const users = getUsersFromRoom(rooms, roomId);
    Room.update({speakers: users}, {where: {id: roomId}})
      console.log("disconnect")
    }
    console.log(rooms)
  })
});


app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Роуты под комнаты
app.get(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.index
);
app.post(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.create
);
app.get(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.show
);
app.delete(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.delete
);


// Регистрация через гит
app.get("/auth/github", passport.authenticate("github"));

// Получение данных о профиле
app.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.getMe
);

// Активация через смс код
app.post(
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

server.listen(3002, () => {
  console.log("SERVER RUNNED");
});
