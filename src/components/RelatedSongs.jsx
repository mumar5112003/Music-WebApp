import SongBar from './SongBar' 
import { useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice'
const RelatedSongs = ({data,isPlaying,activeSong,artistId}) =>{
  const dispatch = useDispatch()

  const handlePauseClick=() => {
    dispatch(playPause(false));
  }

  const handlePlayClick=(song,i) => {
    dispatch(setActiveSong({song,data,i}))
    dispatch(playPause(true));
  }

  return(
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>Related Songs</h1>
      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song,i)=>(
          <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={()=>handlePlayClick(song,i)}
           />
        ))}
      </div>
    </div>
  )}
  

export default RelatedSongs;
