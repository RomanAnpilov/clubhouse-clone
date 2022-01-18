import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path: "server/.env"
});

import {passport} from "./core/passport";

const app = express();

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3002, () => {
  console.log("SERVER RUNNED");
});
