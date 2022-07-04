const express = require('express');
const cors = require("cors");
const morgan = require('morgan')
const connectDB = require('./config/db')
const app = express();
const musicroutes = require('./src/routes/music');
const artistroutes = require('./src/routes/artist');

app.use(express.json({extended: false}));
app.use(cors());
app.use(morgan('dev'));

connectDB();

app.get("/", (req, res) => {
    res.status(200).send({
      status: "success",
      data: {
        message: "Music Api SideHustle Portfolio Bootcamp",
      },
    });
  });

  app.all("*", (req, res) => {
    res.send({
      status: false,
      messsage: "Oops! you've hitted an invalid route.",
    });
  });

  app.use("/api/v1/music", musicroutes);
  app.use("/api/v1/artist", artistroutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});