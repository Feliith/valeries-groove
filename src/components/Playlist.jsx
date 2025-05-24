import React from "react"

function Playlist({ navbarOpen, playlistOpen, setPlaylistOff, actualPlaylist }) {
    return (
        <div className={`bg-[#030303] flex w-full h-screen absolute mb-[20vh] pt-[20vh] duration-200 ease-in-out ${navbarOpen ? "pl-[40vh]" : "pl-[10vh]"} ${!playlistOpen ? "translate-x-[-100%]" : "translate-x-0"}`}>
            <button 
                onClick={setPlaylistOff}
                className="absolute w-10 h-10 text-2xl cursor-pointer">
                X
            </button>
            {actualPlaylist && 
                <div>
                    <h2>{actualPlaylist.name}</h2>
                </div>
            }
        </div>
    )
}

export default Playlist