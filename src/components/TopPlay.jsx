import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'

import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

import 'swiper/css'
import 'swiper/css/free-mode'

const TopChartCard = ({
  handlePlay,
  handlePause,
  isPlaying,
  activeSong,
  song,
  i,
}) => (
  <div className="w-full flex flex-row justify-between items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <div className="flex items-center">
      <h3 className="text-white text-1xl font-bold mr-4">{i + 1}.</h3>
      <img
        className="w-20 h-20 rounded-2xl"
        src={song.images.coverart}
        alt="top-chart"
      />
      <div className="ml-2">
        <Link to={`/songs/${song.key}`}>
          <h2 className="text-white font-bold text-2xl mb-2">{song.title}</h2>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-gray-300 text-base">{song.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying} 
      activeSong={activeSong}
      song={song} 
      handlePause={handlePause} 
      handlePlay={handlePlay}
    />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data, isFetching } = useGetTopChartsQuery()
  const divRef = useRef(null)

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  const topPlays = data?.slice(0, 5)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = ( song, i ) => {
    console.log(i)
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 
    flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts" className='text-white underline hover:no-underline'>
            <p>See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, i)}
              activeSong={activeSong}
              isPlaying={isPlaying}
              key={song.key}
              song={song}
              i={i}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col justify-between mt-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists" className='text-white underline hover:no-underline'>
            <p>See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          className="mt-4 select-none"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay
