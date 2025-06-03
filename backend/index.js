const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const Note = require('./models/Note');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);


Note.initModel(sequelize);

sequelize.sync().then(() => console.log('DB synced.'));

app.get('/notes', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content });
  res.status(201).json(note);
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByPk(id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  await note.destroy();
  res.status(204).end();
});

app.listen(3001, () => console.log('Backend running on port 3001'));
