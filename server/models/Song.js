const getId = require('../utils/getId');

class Song {
  static #all = [];

  constructor(title, artist) {
    this.id = getId();
    this.title = title;
    this.artist = artist;

    Song.#all.push(this);
  }

  static list() {
    return Song.#all;
  }

  static find(id) {
    return Song.#all.find((song) => song.id === id);
  }

  static update(id, newData) {
    const song = Song.find(id);
    if (!song) return null;
    
    if (newData.title) {
      song.title = newData.title;
    }
    if (newData.artist) {
      song.artist = newData.artist;
    }
    
    return song;
  }

  static delete(id) {
    const songIndex = Song.#all.findIndex((song) => song.id === id);
    if (songIndex < 0) return null;

    Song.#all.splice(songIndex, 1);
    return true;
  }

  static deleteAll() {
    if (!Song.#all.length) return null;

    Song.#all.length = 0;
    return Song.#all;
  }
}

module.exports = Song;
