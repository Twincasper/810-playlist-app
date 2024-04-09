const PlayList = require('../models/Playlist');

// use the PlayList model to serve all playlists (READ)
const servePlayLists = (req, res) => {
  res.json(PlayList.list());// playlist is a static method in the PlayList class
}

// use the PlayList model to serve one playlist (READ)
const servePlayList = (req, res) => {
  const { id } = req.params;
  const playList = PlayList.find(Number(id));// find static method in the PlayList class
  if (!playList) {
    res.status(404).send('PlayList not found');
    return;
  }
  res.send(playList);
}

const createPlayList = (req, res) => {
  const { playListName } = req.body;
  const newPlayList = new PlayList(playListName);
  res.send(newPlayList);
}

const editPlayListName = (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  const updatedPlayList = PlayList.editPlayListName(Number(id), newName);
  if (!updatedPlayList) {
    res.status(404).send('PlayList not found');
    return;
  }
  res.send(updatedPlayList);
}

const deletePlaylist = (req, res) => {
  const { id } = req.params;
  const didDelete = Playlist.delete(parseInt(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

const deleteAllPlaylists = (req, res) => {
  const deletedPlaylists = Playlist.deleteAll();
  if (!deletedPlaylists) {
    return res.status(404).send("There are no playlists to delete.");
  }
  res.sendStatus(204);
}

module.exports = {
  servePlayLists,
  createPlayList,
  editPlayListName,
  servePlayList,
  deletePlaylist,
  deleteAllPlaylists
}