const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userModel = require("./models/user.model");
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
        res.json({ status: "ok", user });
      } catch (err) {
        res.json({ status: "error", message: err.message });
      }
    });

    app.listen("8080", () => {
      console.log(`App started on localhost:8080`);
    });
  })
  .catch((err) => console.log(err));
