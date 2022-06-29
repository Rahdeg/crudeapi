const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/user");
const taskRoutes = require("./src/routes/task");
const imageRoutes = require('./src/routes/image');
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.set('view engine', 'ejs');

app.get('/upload',(req, res)=>{
  res.render('upload');
})



// app.get('/multiupload',(req, res)=>{
//   res.render('upload');
// })

// app.post('/upload',upload.single('image'), (req, res)=>{
//   res.send('image upload successfully');
// } )


// app.post('/multiupload',upload.array('images',3), (req, res)=>{
//   console.log(req.file);
//   res.send('multipe image upload successfully');
// } )


app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "Todo API of the SideHustle Portfolio Bootcamp",
    },
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/image", imageRoutes);

// Handle when an invalid route is hitted
app.all("*", (req, res) => {
  res.send({
    status: false,
    messsage: "Oops! you've hitted an invalid route.",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
