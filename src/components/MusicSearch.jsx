import { useState, useEffect, useRef } from "react"

import { musicasAmy } from "../data/musics"

export default function MusicSearch({ handlePlayMusic }) {
    const [search, setSearch] = useState("")
    const [focus, setFocus] = useState(false)
    const containerRef = useRef(null);

    const filtered = musicasAmy.filter(m =>
        m.nome.toLowerCase().includes(search.toLowerCase()) ||
        m.album.toLowerCase().includes(search.toLowerCase()) ||
        m.artista.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5)

    useEffect(() => {
        function handleClickOutside(event) {
          if (containerRef.current && !containerRef.current.contains(event.target)) {
            setFocus(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center justify-center relative w-full h-full">
            <input 
                type="text"
                placeholder="Buscar músicas, álbuns, artistas..."
                value={search}
                onFocus={() => setFocus(true)}
                onBlur={() => [
                    setTimeout(() => setFocus(false), 150)
                ]}
                onChange={e => {setSearch(e.target.value)}}
                className="bg-[#212121] focus:bg-[#030303] w-[30%] h-[60%] pl-4 focus:outline-none border border-gray-500 focus:rounded-b-none rounded-lg"
            />
            {focus &&
                <ul className="bg-[#030303] flex flex-col absolute w-[30%] top-[7.8vh] py-3 rounded-b-lg border border-gray-500 z-10">
                {search && filtered.map(m => (
                    <li 
                        key={m.id}
                        className="p-2 cursor-pointer hover:bg-[#292929]"
                        onClick={() => {
                            handlePlayMusic(m), setSearch("")
                        }}>
                        <div>
                            <p className="p-0">
                                {m.nome}
                            </p>
                            <p className="p-0">
                                {m.artista} - {m.album}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            }
        </div>
    )
}
