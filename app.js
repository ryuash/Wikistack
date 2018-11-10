const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db } = require('./models');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// });

const PORT = 1337;

const init = async () => {
  try {
    // models.db.sync({force: true});
    await models.db.sync();
    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`);
    });
  }
  catch (error){
    console.error(error.message);
  }
};

init();
