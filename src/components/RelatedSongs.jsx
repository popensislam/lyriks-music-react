import SongBar from './SongBar'

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
  artistId
}) => {
  console.log(data)
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-white text-2xl">Related Songs:</h1>

      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song, i) => 
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            activeSong={activeSong}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        )}
      </div>
    </div>
  )
}

export default RelatedSongs
