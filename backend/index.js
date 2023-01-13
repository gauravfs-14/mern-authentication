const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userModel = require("./models/user.model");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/mernAuthDB", () => {
    //signup
    app.post("/api/v1/user/signup", async (req, res) => {
      try {
        const user = await userModel.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        res.json({
          status: "ok",
          user: {
            name: req.body.name,
            email: req.body.email,
          },
        });
      } catch (err) {
        res.json({ status: "error", message: err.message });
      }
    });
    app.post("/api/v1/user/login", async (req, res) => {
      try {
        const dbUser = await userModel.findOne({ email: req.body.email });
        if (
          dbUser?.email === req.body?.email &&
          dbUser?.password === req.body?.password
        ) {
          const token = jwt.sign(
            { email: dbUser.email, name: dbUser.name },
            "djfhgjehindsfjgnjksdhdshjfg12323412"
          );
          res.json({ status: "ok", token: token });
        } else {
          res.json({ status: "error", message: "Invalid Credentials" });
        }
      } catch (err) {
        res.json({ status: "error", message: err.message });
      }
    });
    app.get("/api/v1/user/data", async (req, res) => {
      const token = req.headers["x-access-token"];
      try {
        const decoded = jwt.verify(
          token,
          "djfhgjehindsfjgnjksdhdshjfg12323412"
        );
        const user = await userModel.findOne({ email: decoded.email });
        res.json({
          status: "ok",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } catch (err) {
        res.json({ status: "error", message: err.message });
      }
    });

    app.listen("8080", () => {
      console.log(`App started on localhost:8080`);
    });
  })
  .catch((err) => console.log(err));
