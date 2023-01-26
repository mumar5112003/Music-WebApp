import {useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Error,Loader,SongCard} from '../components'
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
const AroundYou = () => {
    const [countryCode, setCountryCode] = useState('')
    const [loading, setLoading] = useState(true)
    const {activeSong,isPlaying}=useSelector((state) =>state.player)
    const {data,isFetching,error}=useGetSongsByCountryQuery(countryCode)
    //console.log(data)
    useEffect(() =>{
     axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_TCc3xxxqYfzRIR6RCW4L5ElBW60uG').
    then((res)=>setCountryCode(res?.data?.location?.country)).catch((error)=>console.log(error)).finally(()=>setLoading(false))
    },[countryCode])
    if(isFetching&&loading)return <Loader title='Loading songs around you' />
    console.log(countryCode)
    // if(error&&countryCode)return <Error />
    return(
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around You
      <span className='font-black'>{countryCode}</span>
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song,i)=>
        <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
        />
        )}
      </div>
    </div>
    )};

export default AroundYou;
