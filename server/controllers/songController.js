const Song = require('../models/Song');

const serveSongs = (req, res) => {
  res.json(Song.list());
}

const serveSong = (req, res) => {
  const { id } = req.params;
  const song = Song.find(Number(id));
  if (!song) {
    res.status(404).send('Song not found');
    return;
  }
  res.send(song);
}

const createSong = (req, res) => {
  const { title, artist } = req.body;
  if (!title || !artist) {
    return res.status(400).send('Title and artist are required');
  }

  const newSong = new Song(title, artist);
  res.status(201).json(newSong);
}

const editSong = (req, res) => {
  const { id } = req.params;
  const { title, artist } = req.body;

  const updatedSong = Song.update(Number(id), { title, artist });
  if (!updatedSong) {
    res.status(404).send('Song not found');
    return;
  }
  res.send(updatedSong);
}

const deleteSong = (req, res) => {
  const { id } = req.params;
  const didDelete = Song.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

const deleteAllSongs = (req, res) => {
  const deletedSongs = Song.deleteAll();
  if (!deletedSongs) {
    return res.status(404).send("There are no songs to delete.");
  }
  res.sendStatus(204);
}

module.exports = {
  serveSongs,
  createSong,
  editSong,
  serveSong,
  deleteSong,
  deleteAllSongs
}
