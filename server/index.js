const express = require('express');
const path = require('path');

const { 
  serveSongs,
  createSong,
  editSong,
  serveSong,
  deleteSong,
  deleteAllSongs
} = require('./controllers/songController');

const app = express();

const PORT = process.env.PORT || 8080;

const pathToDist = path.join(__dirname, '..', 'client', 'dist');

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
}
const serveStatic = express.static(pathToDist);
const parseJSON = express.json();

app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON);

// Endpoint and method dictate the controller function to be called
app.get('/api/songs', serveSongs);
app.get('/api/songs/:id', serveSong);
app.post('/api/songs', createSong);
app.patch('/api/songs/:id', editSong);
app.delete('/api/songs/:id', deleteSong);
app.delete('/api/songs', deleteAllSongs);

app.get('*', (req, res) => {
  res.status(404).send({ msg: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
