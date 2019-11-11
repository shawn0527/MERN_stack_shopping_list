const express = require('express') //backend framework
const mongoose = require('mongoose') //ORM to interact with MongoDB database
const bodyParser = require('body-parser') //take request and get data from the body
const items = require("./routes/api/items")
const users = require("./routes/api/users")

const app =  express();

//Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/key").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));

