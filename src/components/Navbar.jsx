import { HomeIcon, WalletIcon, MagnifyingGlassPlusIcon, PlusIcon } from '@heroicons/react/24/solid'

function Navbar({ playlists, navbarOpen, handleHome, handleExplore, handleLibrary, handlePlaylist, handleCreatePlaylist }) {
    return (
        <div className={`flex flex-col items-center px-2 bg-[#030303] py-[10vh] h-screen border-r-1 border-gray-500 absolute left-0 z-8 duration-200 ease-in-out ${navbarOpen ? 'w-[40vh]' : 'w-[10vh]'}`}>
            <ul className="w-full pt-4 gap-4 flex flex-col ">
                <li 
                    onClick={handleHome}
                    className="w-full p-3 rounded-lg border-1 border-gray-500 cursor-pointer hover:bg-[#212121] duration-200 ease-in-out flex justify-center">
                    {navbarOpen ? 
                        <button className="flex cursor-pointer"><HomeIcon className='w-5 mr-3' /> Início</button>
                        : <HomeIcon className='w-5'/>}
                </li>
                <li 
                    onClick={handleExplore}
                    className="w-full p-3 rounded-lg border-1 border-gray-500 cursor-pointer hover:bg-[#212121] duration-200 ease-in-out flex justify-center">
                    {navbarOpen ? 
                        <button 
                            
                            className="flex cursor-pointer">
                            <MagnifyingGlassPlusIcon className='w-5 mr-3' /> 
                            Explorar
                        </button>
                        : <MagnifyingGlassPlusIcon 
                                className='w-5'/>}
                </li>
                <li 
                    onClick={handleLibrary}
                    className="w-full p-3 rounded-lg border-1 border-gray-500 cursor-pointer hover:bg-[#212121] duration-200 ease-in-out flex justify-center">
                    {navbarOpen ? 
                        <button className="flex cursor-pointer"><WalletIcon className='w-5 mr-3' /> Biblioteca</button>
                        : <WalletIcon className='w-5'/>}                
                </li>
            </ul>
            <span className='block w-[20%] h-[1px] bg-gray-500 m-6' />
            <button 
                onClick={handleCreatePlaylist}
                className="p-3 border-1 flex justify-center border-gray-500 w-full text-center rounded-lg cursor-pointer hover:bg-[#212121] duration-200 ease-in-out">
                {navbarOpen ? 
                    <div className='w-full flex justify-center cursor-pointer'><PlusIcon className='w-5 mr-3'/>Nova Playlist</div>
                : <PlusIcon className='w-5'/>}
            </button>
            {navbarOpen &&
                <ul id="playlists" className='w-full mt-4 overflow-y-auto scrollbar-custom'>
                    {playlists.map((playlist) => (
                        <li 
                            onClick={() => {handlePlaylist(playlist)}}
                            key={playlist.id} 
                            className="w-full p-2 my-2 text-gray-300 rounded-xl hover:bg-[#212121] cursor-pointer duration-200 ease-in-out">
                            <p>{playlist.name} </p>
                            <p className='text-[1.6vh] text-gray-500'>{playlist.author}</p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Navbar