import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FormList = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const addSong = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/songs', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, artist })
      });
      const newSong = await response.json();
      setSongs([...songs, newSong]);
      setTitle('');
      setArtist('');
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  return (
    <>
      <h1>Song List</h1>
      <form onSubmit={addSong}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
        <label htmlFor="artist">Artist:</label>
        <input type="text" id="artist" value={artist} onChange={handleArtistChange} />
        <button type="submit">Add Song</button>
      </form>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <Link to={`/songs/${song.id}`}>{song.title} - {song.artist}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FormList;
