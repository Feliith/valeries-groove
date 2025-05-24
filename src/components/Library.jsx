
function Library({ libraryOpen, navbarOpen, handlePlaylist, playlists }) {

    return (
        <div className={`bg-[#030303] flex w-full h-screen absolute mb-[20vh] pt-[20vh] duration-200 ease-in-out ${navbarOpen ? "pl-[40vh]" : "pl-[10vh]"} ${!libraryOpen ? "translate-x-[-100%]" : "translate-x-0"}`}>
            <ul className="w-full h-full flex p-8">
                {playlists.map((playlist) => (
                    <li 
                        key={playlist.id}
                        onClick={() => {handlePlaylist(playlist)}}
                        className="w-50 h-50 p-6 border-1 border-gray-500 duration-200 ease-in-out cursor-pointer hover:bg-[#212121]">
                        <p>{playlist.name} </p>
                        <p className='text-[1.6vh] text-gray-500'>{playlist.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Library