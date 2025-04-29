import { useState, useEffect } from "react"

import MusicPlayer from "./components/MusicPlayer"
import MusicSearch from "./components/MusicSearch"

function App() {
  const [actualMusic, setActualMusic] = useState(null)
  const [history, setHistory] = useState([])
  const [actualIndex, setActualIndex] = useState(0)

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

  useEffect(() => {
    console.log(actualMusic)
  }, [actualMusic])
  
  return (
    <div className='bg-[#030303] w-full h-screen flex flex-col items-center justify-center'>
      <header className="absolute top-0 w-full h-[10vh] flex items-center justify-around border-b border-gray-500">
        <MusicSearch handlePlayMusic={handlePlayMusic} actualMusic={actualMusic} />
      </header>
      <MusicPlayer actualMusic={actualMusic} handlePreviousMusic={handlePreviousMusic} handleNextMusic={handleNextMusic} />
    </div>
  )
}

export default App
