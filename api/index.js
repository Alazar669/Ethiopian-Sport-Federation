import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import User from "../api/models/user.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import complain from "./routes/complain.js";
import deparetement from "./routes/deparetement.js";
const app = express();
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/complain", complain);
app.use("/api/deparetement", deparetement);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});

// 


app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: 201 });
    }
    const secret = process.env.JWT + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "15m",
    });
    const link = `http://localhost:8800/reset-password/${oldUser._id}/${token}`;
    console.log(link)
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alazartsegaye81@gmail.com",
        pass: "wclbyiuxxwunruet",
      },
    });

    var mailOptions = {
      from: "alazartsegaye81@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
      
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
    return res.json({ status: 200 });
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: 201 });
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log("Now we are going to change our Password")
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: 201 });
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const verify = jwt.verify(token, secret);
    // const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(
      id,
     
      {
        $set: {
          password: hash,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});