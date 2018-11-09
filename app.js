const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(layout());
});

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// });

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
})
