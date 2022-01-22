import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { nanoid } from "nanoid";

dotenv.config({
  path: "server/.env",
});

import "./core/db";

import { passport } from "./core/passport";

const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, "public/avatars/");
    },
    filename: function (_, file, cb) {
      cb(null, file.fieldname + "-" + nanoid(6) + '.' + file.mimetype.split("/").pop());
    },
  }),
});

app.use(cors());
app.use(passport.initialize());

app.get("/auth/github", passport.authenticate("github"));

app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename}`
  });
});

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
