import { PlayIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { musicasAmy } from "../data/musics"
import { useState } from 'react'

function Explore ({ navbarOpen, exploreOpen }) {
    const [index, setIndex] = useState(1)

    const prevIndex = () => {
        if (index > 1) {
            setIndex(index - 1)
        }
    }

    const nextIndex = () => {
        if (index < musicasAmy.length)
        setIndex(index + 1)
    }

    return (
        <div className={`bg-[#030303] flex w-full h-screen absolute mb-[20vh] pt-[20vh] duration-200 ease-in-out ${navbarOpen ? "pl-[40vh]" : "pl-[10vh]"} ${!exploreOpen ? "translate-x-[-100%]" : "translate-x-0"}`}>
            <ul className="w-full h-full flex relative items-center">
                {musicasAmy.slice().reverse().map(m => (
                        <li
                            key={m.id}
                            className={`w-full absolute flex flex-col items-center justify-center translate-x-[-6%] translate-y-[-10%] ${index == m.id && "z-10"}`}
                        >
                            <button
                                onClick={prevIndex}
                                className='absolute left-90 cursor-pointer ease-in-out duration-200 hover:scale-120'>
                                <ChevronDoubleLeftIcon className='w-10' />
                            </button>
                            <div className='w-80 flex flex-col items-center justify-center'>
                                <p className={`p-0 cursor-pointer hover:underline ${index != m.id && "opacity-0" }`}>
                                    {m.nome}
                                </p>
                                <p className={`p-0 cursor-pointer hover:underline ${index != m.id && "opacity-0" }`}>
                                    {m.artista} - {m.album}
                                </p>
                            </div>
                            <img 
                                src={m.cover}
                                alt="Cover"
                                className="w-[250px] h-[250px] mt-[10px] rounded-sm border-1 border-[#00000090] " 
                                style={{transform: `translateX(${m.id * 5}px) translateY(${m.id * 5}px)`, boxShadow: "3px 3px 0 rgba(0, 0, 0, 0.83)" }}
                            />
                            <span 
                                style={{transform: `translateX(${m.id * 5}px) translateY(${m.id * 5}px)` }}
                                className='cursor-pointer rounded-sm flex items-center justify-center absolute bottom-0 w-[250px] h-[250px] bg-black opacity-0 ease-in-out duration-200 hover:opacity-[90%]'>
                                <PlayIcon className="w-[20%] p-[12px] border-1 rounded-full hover:scale-110 duration-200 ease-in-out"/>
                            </span>
                            <button 
                                onClick={nextIndex}
                                className='absolute right-78 cursor-pointer ease-in-out duration-200 hover:scale-120'>
                                <ChevronDoubleRightIcon className='w-10' />
                            </button>
                        </li>
                ))}
            </ul>
        </div>
    )
}

export default Explore