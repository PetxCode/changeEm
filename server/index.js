const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 9900;
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("connection has been established: ", socket.id);
});

const url = "mongodb://localhost/checkDB";

const url_online =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url_online).then(() => {
  console.log("database connected");
});

app.use(cors());
app.use(express.json());
app.use("/", require("./router"));

const db = mongoose.connection;

db.on("open", () => {
  const dbConnect = db.collection("checkers").watch();

  dbConnect.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const file = {
        _id: change.fullDocument._id,
        name: change.fullDocument.name,
        course: change.fullDocument.course
      };
      io.emit("observer", file);
    } else if (change.operationType === "delete") {
      io.emit("observerDelete", change);
    }
  });
});

server.listen(port, () => {
  console.log("this is the Server ");
});
