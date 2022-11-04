require('dotenv').config();

const express = require('express');
const app = express();

const infoRouter = require('./routes/infoRouter');


const mongoose = require('mongoose');

const ath = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_DB, ath)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("MongoDB Connection Failed!"));

app.use(express.json());

app.use("/api/info", infoRouter);


app.get('/', (req, res) => {
    res.send("It's HomePage");
});

//app.post();

app.listen(process.env.PORT, () => {
    console.log("Listening on " + process.env.PORT);
})


