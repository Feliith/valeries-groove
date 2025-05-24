import { useState } from "react"

function CreatePlaylist({ createPlaylistOpen, createPlaylistOff, playlists, setPlaylists }) {
    const [value, setValue] = useState("")
    const [index, setIndex] = useState(2)

    const createPlaylist = () => {
        if (value == "" ) {
            alert("Coloque um nome")
        }
        else {
            const playlist = {
                "id": index,
                "name": value,
                "author": "Creator",
                "description": "",
                "songs": []
            }
            setIndex(index + 1)
            setPlaylists([...playlists, playlist])
            createPlaylistOff()
            setValue("")
        }
    }

    const createPlaylistX = () => {
        createPlaylistOff()
        setValue("")
    }

    return (
        <div className={`bg-[#212121] flex flex-col items-center absolute z-11 w-90 h-90 border-1 border-gray-500 duration-300 ease-in-out ${createPlaylistOpen ? "translate-x-0" : "translate-x-[-250%]"}`}>
            <button 
                onClick={createPlaylistX}
                className="absolute left-0 w-10 h-10 text-xl cursor-pointer">
                X
            </button>
            <h2>Criar Nova Playlist</h2>
            <input 
                value={value}
                onChange={e => {setValue(e.target.value)}}
                type="text"
                placeholder="Nome da playlist..."/>
            <button
                onClick={createPlaylist}
                className="border-1 border-gray-500 cursor-pointer">
                Criar Playlist
            </button>
        </div>
    )
}

export default CreatePlaylist