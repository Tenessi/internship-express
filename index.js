const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const {PORT, DB, DB_STORAGE} = require('./config')

const app = express();
const port = PORT;

const sequelize = new Sequelize({
  dialect: DB,
  storage: DB_STORAGE
});

class User extends Model {}
User.init({
  name: DataTypes.STRING,
  age: DataTypes.INTEGER
}, { sequelize, modelName: 'user' });

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});