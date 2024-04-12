import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');

  useEffect(() => {
    fetchSongDetails();
  }, []);

  const fetchSongDetails = async () => {
    try {
      const response = await fetch(`/api/songs/${id}`);
      const data = await response.json();
      setSong(data);
    } catch (error) {
      console.error('Error fetching song details:', error);
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleArtistChange = (event) => {
    setNewArtist(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: newTitle, artist: newArtist })
      });
      const updatedSong = await response.json();
      setSong(updatedSong);
      setNewTitle('');
      setNewArtist('');
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleDeleteSong = async () => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error('Delete operation failed');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  if (!song) {
    return <div>No song found!</div>;
  }

  return (
    <>
      <h1>Song Details</h1>
      <div>
        <h2>{song.title}</h2>
        <p>Artist: {song.artist}</p>
        <p>ID: {song.id}</p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="newTitle">New Title:</label>
        <input type="text" id="newTitle" value={newTitle} onChange={handleTitleChange} />
        <label htmlFor="newArtist">New Artist:</label>
        <input type="text" id="newArtist" value={newArtist} onChange={handleArtistChange} />
        <button type="submit">Update Song</button>
      </form>
      <button onClick={handleDeleteSong}>Delete Song</button>
    </>
  );
};

export default SongDetails;
