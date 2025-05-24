import { useState, useEffect } from "react"

import { Bars3Icon } from '@heroicons/react/24/solid'

import MusicPlayer from "./components/MusicPlayer"
import MusicSearch from "./components/MusicSearch"
import Explore from "./components/Explore"
import Navbar from "./components/Navbar"
import Library from "./components/Library"
import Playlist from "./components/Playlist"
import CreatePlaylist from "./components/CreatePlaylist"

function App() {
  const [actualMusic, setActualMusic] = useState(null)
  const [history, setHistory] = useState([])
  const [actualIndex, setActualIndex] = useState(0)
  const [navbarOpen, setNavbarOpen] = useState(true)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [actualPlaylist, setActualPlaylist] = useState(null)
  const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false)

  const [playlists, setPlaylists] = useState([
    {
        "id": 1,
        "name": "Escutar Mais Tarde",
        "author": "Auto Playlist",
        "description": "Músicas salvas para ouvir depois",
        "songs": []
    }
  ])  

  const handlePlayMusic = (music) => {
    if (actualMusic && actualMusic !== music) {
      setActualIndex((prevIndex) => prevIndex + 1)
      setActualMusic(music)
      setHistory((prev) => [...prev, music])
    } else if (!actualMusic) {
      setActualMusic(music)
      setHistory((prev) => [...prev, music])
    }
  }

  const handlePreviousMusic = () => {
    if (actualIndex > 0) {
        const previous = history[actualIndex - 1]
        setActualMusic(previous);
        setActualIndex(actualIndex - 1)
    }
  }

  const handleNextMusic = () => {
    if(actualIndex < history.length - 1) {
      const next = history[actualIndex + 1]
      setActualMusic(next)
      setActualIndex(actualIndex + 1)
    }
  }

  const toggleNavbar = ()  => {
    setNavbarOpen(!navbarOpen)
  }

  const handleHome = () => {
    setExploreOpen(false)
    setLibraryOpen(false)
    setPlaylistOpen(false)
    setCreatePlaylistOpen(false)
    setActualMusic(null)
  }

  const handleExplore = () => {
    setExploreOpen(true)
    setLibraryOpen(false)
    setPlaylistOpen(false)
    setCreatePlaylistOpen(false)
  }

  const handleLibrary = () => {
    setLibraryOpen(true)
    setExploreOpen(false)
    setPlaylistOpen(false)
    setCreatePlaylistOpen(false)
  }

  const handlePlaylist = (p) => {
      setLibraryOpen(false)
      setExploreOpen(false)
      setPlaylistOpen(true)
      setLibraryOpen(true)
      setCreatePlaylistOpen(false)
      setActualPlaylist(p)
      console.log(p)
  }

  const setPlaylistOff = () => {
      setPlaylistOpen(false)
      setActualPlaylist(null)
  }

  const handleCreatePlaylist = () => {
    setCreatePlaylistOpen(true)
  }

  const createPlaylistOff = () => {
    setCreatePlaylistOpen(false)
  }
  
  useEffect(() => {
  }, [actualMusic])
  
  return (
    <div className='bg-[#030303] w-full h-screen flex flex-col items-center justify-center'>
      <header className="z-9 bg-[#030303] absolute top-0 w-full h-[10vh] flex items-center justify-around border-b border-gray-500">
        <button 
          className={`absolute left-3 p-2 cursor-pointer z-10 border-1 border-gray-500 rounded-full hover:bg-[#212121] duration-200 ease-in-out ${navbarOpen && "bg-[#212121]"}`}
          onClick={toggleNavbar}>
          <Bars3Icon className="h-6" />
        </button>
        <MusicSearch handlePlayMusic={handlePlayMusic} actualMusic={actualMusic} />
      </header>
      <Navbar navbarOpen={navbarOpen} playlists={playlists} handleHome={handleHome} handleExplore={handleExplore} handleLibrary={handleLibrary} handlePlaylist={handlePlaylist} handleCreatePlaylist={handleCreatePlaylist} />
      <MusicPlayer actualMusic={actualMusic} handlePreviousMusic={handlePreviousMusic} handleNextMusic={handleNextMusic} />
      <Explore navbarOpen={navbarOpen} exploreOpen={exploreOpen} handlePlayMusic={handlePlayMusic} />
      <Library navbarOpen={navbarOpen} playlists={playlists} libraryOpen={libraryOpen} handlePlaylist={handlePlaylist} />
      <Playlist navbarOpen={navbarOpen} playlistOpen={playlistOpen} setPlaylistOff={setPlaylistOff} actualPlaylist={actualPlaylist} />
      <span 
        onClick={createPlaylistOff}
        className={`w-screen h-screen bg-[#0000009b] z-10 absolute ${!createPlaylistOpen && "hidden"}`}></span>
      <CreatePlaylist playlists={playlists} setPlaylists={setPlaylists} createPlaylistOpen={createPlaylistOpen} createPlaylistOff={createPlaylistOff} />
    </div>
  )
}

export default App
