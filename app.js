
const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout')
const router = require('./routes/users')
const wikiRouter = require('./routes/wiki')
const { db, Page, User } = require('./models');

app.use('/wiki', wikiRouter);
app.use('/users', router);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  });

app.use(morgan("dev"));
app.use(express.static(__dirname + "public"));

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res, next) => {
  res.send(layout(""));
});

const connect = async () => {
  await db.sync({force: true});

  const PORT = 3000;

  app.listen(PORT, () => {
  console.log(`App listening in port--> http://localhost:${PORT}`)
});
};

connect();

