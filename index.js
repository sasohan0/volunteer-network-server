const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//MongoDB connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2nttd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const activityCollection = client
      .db("volunteer-network")
      .collection("activities");

    app.get("/", async (req, res) => {
      res.send("connected");
    });
    console.log("connected");

    app.get("/activities", async (req, res) => {
      const query = {};
      const cursor = activityCollection.find(query);
      const activities = await cursor.toArray();
      res.send(activities);
    });
  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log("listening to", port);
});
