import { useEffect, useRef, useState } from "react"
import { PlayIcon, PauseIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { motion } from "framer-motion"
import { Howl } from "howler"

import discoImg from "../assets/disco.png"
import coverImg from "../assets/cover.png"

export default function MusicPlayer({ actualMusic, handlePreviousMusic, handleNextMusic }) {
    const soundRef = useRef(null)
    const intervalRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [coverSrc, setCoverSrc] = useState(coverImg)

    const formatTime = (time) => {
        if (isNaN(time) || time == null) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    useEffect(() => {
        if (actualMusic) {
            if (soundRef.current) {
                soundRef.current.stop()
            }
    
            const newSound = new Howl({
                src: [actualMusic.audio],
                html5: true,
                onload: () => {
                    setDuration(newSound.duration())
                },
                onend: () => {
                    setIsPlaying(false)
                    clearInterval(intervalRef.current)
                }
            })
    
            soundRef.current = newSound
            newSound.play()
            setIsPlaying(true)
    
            intervalRef.current = setInterval(() => {
                if (soundRef.current && soundRef.current.playing()) {
                    setCurrentTime(soundRef.current.seek())
                }
            }, 500)
        }
    
        return () => {
            if (soundRef.current) {
                soundRef.current.stop()
            }
            clearInterval(intervalRef.current)
        }
    }, [actualMusic])

    useEffect(() => {
        if (actualMusic?.cover) {
            setCoverSrc(actualMusic.cover)
        } else {
            setCoverSrc(coverImg)
        }
    }, [actualMusic?.cover])
    
    const togglePlay = () => {
        if (isPlaying) {
            soundRef.current.pause()
        } else {
            soundRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value
        soundRef.current.volume(newVolume)
        setVolume(newVolume)
    }

    return (
        <div className="w-full h-screen">
            <motion.img 
                src={discoImg}
                alt="Disco"
                animate={isPlaying  ? {rotate: 360} : ""}
                transition={isPlaying ? {repeat: Infinity, duration: 8, ease: "linear"} : ""}
                className="absolute max-w-[30%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <motion.img 
                src={coverSrc}               
                alt="Cover"
                animate={isPlaying  ? {rotate: 360} : ""}
                transition={isPlaying ? {repeat: Infinity, duration: 8, ease: "linear"} : ""}
                className="absolute rounded-full max-w-[12%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            {!actualMusic ?
                <img src={coverImg} alt="Cover" className="absolute rounded-sm max-w-[31%] duration-500 ease-in-out top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                : <img src={coverImg} alt="Cover" className="absolute rounded-sm max-w-[31%] duration-500 ease-in-out top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-150%]" />
            }
            <footer className="bg-[#212121] w-full h-[10vh] border-t-1 border-gray-500 flex items-center justify-around absolute bottom-0 left-0 z-10">
                <input
                    type="range"
                    min={0}
                    max={duration}
                    step="0.1"
                    value={currentTime}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        soundRef.current.seek(val)
                        setCurrentTime(val)
                    }}
                    className={`w-full absolute top-[-12px] ${!actualMusic && "hidden"}`}
                />
                {actualMusic &&
                    <div className="relative flex items-center justify-center">
                        <button
                            onClick={handlePreviousMusic}
                        >
                            <ChevronDoubleLeftIcon className="w-8 cursor-pointer hover:scale-110 ease-in-out duration-200" />
                        </button>
                        <button 
                            onClick={togglePlay} 
                        >
                            {isPlaying ? <PauseIcon className="w-10 mx-3 cursor-pointer hover:scale-110 ease-in-out duration-200" />
                                         : <PlayIcon className="w-10 mx-3 cursor-pointer hover:scale-110 ease-in-out duration-200" />}
                        </button>
                        <button
                            onClick={handleNextMusic}
                        >
                            <ChevronDoubleRightIcon className="w-8 cursor-pointer hover:scale-110 ease-in-out duration-200 " />
                        </button>
                        
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01"
                            value={volume} 
                            onChange={handleVolumeChange}
                            className="w-48 cursor-pointer absolute right-[-28px] translate-x-full top-1/2 -translate-y-1/2"
                        />

                        <div className="absolute left-[-28px] translate-x-[-100%] top-1/2 -translate-y-1/2">
                            <span>{formatTime(currentTime || 0)} / {formatTime(duration || 0)}</span>
                        </div>
                    </div>
                }
                {actualMusic &&
                <div className="absolute flex items-center justify-center w-[40%] h-full left-0">
                    <img src={coverSrc} alt="cover" className="absolute h-[54px] left-[20px]" />
                    <div className="absolute left-[90px]">
                        <p className="p-0">
                            {actualMusic.nome}
                        </p>
                        <p className="p-0">
                            {actualMusic.artista} - {actualMusic.album}
                        </p>
                    </div>
                </div>
                }
            </footer>
        </div>
    )
}
