
const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout')
const { db } = require('./models');

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

 const Page = db.define(
   
 )
app.use(morgan("dev"));
app.use(express.static(__dirname + "public"));

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res, next) => {
  res.send(layout(""));
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port--> http://localhost:${PORT}`)
})
