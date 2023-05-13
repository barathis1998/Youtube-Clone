import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/index.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
app.use('/public', express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
route.route(app);
route.videoRoute(app);
route.commentRoute(app);
route.searchRoute(app);
route.subscriptionRoute(app);
route.historyRoute(app);
route.feelingRoute(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// mongoose.connect("mongodb://127.0.0.1/finalprojecttestdb");

const url =
  "mongodb+srv://finalproject1234:password1234@habkfinalproject.3msa2s6.mongodb.net/utube?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://<webFinalProjectHABK>:<password1234>@habkfinalproject.3msa2s6.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("userdb").collection("users");
//   // perform actions on the collection object
//   client.close();
// });

export default app;
