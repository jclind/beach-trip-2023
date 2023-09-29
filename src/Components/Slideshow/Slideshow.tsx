import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Slideshow.scss'
import { useNavigate } from 'react-router-dom'

type SongListItemType = { title: string; lyrics: string[][]; id: string }

type SlideshowItemType = string[] | string

const Slideshow = () => {
  const [songList, setSongList] = useState<SongListItemType[]>(() => {
    const songListStringified = localStorage.getItem('songList') ?? null
    return songListStringified ? JSON.parse(songListStringified) : []
  })

  const [slides, setSlides] = useState<SlideshowItemType[] | null>(null)
  const [lyricIndex, setLyricIndex] = useState(0)
  const [currSongTitle, setCurrSongTitle] = useState('')

  const [lastSlideEqual, setLastSlideEqual] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (songList) {
      let lyrics: SlideshowItemType[] = []
      songList.forEach(song => {
        const currLyrics = song.lyrics
        console.log(song.lyrics)
        lyrics = [...lyrics, song.title, ...currLyrics, []]
      })

      setSlides(lyrics)
    }
  }, [songList])

  useEffect(() => {
    if (
      lyricIndex !== 0 &&
      slides &&
      Array.isArray(slides[lyricIndex]) &&
      Array.isArray(slides[lyricIndex - 1])
    ) {
      let isEqual = true

      ;(slides[lyricIndex] as string[]).forEach(
        (slide: string, idx: number) => {
          if (slides[lyricIndex - 1][idx] !== slide) {
            isEqual = false
          }
        }
      )
      if (isEqual) {
        setLastSlideEqual(prev => !prev)
      }
    }

    if (slides && typeof slides[lyricIndex] === 'string') {
      setCurrSongTitle(slides[lyricIndex] as string)
    }
  }, [lyricIndex])

  const handleLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()

    if (slides) {
      setLyricIndex(prev => {
        if (prev + 1 >= slides.length - 1) return slides.length - 1
        return prev + 1
      })
    }
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (slides) {
      setLyricIndex(prev => {
        if (prev - 1 < 0) return 0
        return prev - 1
      })
    }
  }

  const handleCloseSlideshow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()

    navigate('/')
  }

  return (
    <div
      className='slideshow-page page'
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      <div className='slideshow-actions'>
        {slides && (
          <div className='slides-index'>
            <div className='text'>
              {lyricIndex + 1} / {slides.length}
            </div>
          </div>
        )}
        <button className='close-slideshow' onClick={handleCloseSlideshow}>
          <AiOutlineClose className='icon close-icon' />
        </button>
      </div>

      {slides && (
        <>
          {typeof slides[lyricIndex] === 'string' ? (
            <div className='container'>
              <div className='song-title'>{slides[lyricIndex]}</div>
            </div>
          ) : (
            <div className='container'>
              <div
                className={`lyrics ${lastSlideEqual ? 'not-equal-gap' : ''}`}
              >
                <div className='song-title'>{currSongTitle}</div>
                {(slides[lyricIndex] as string[]).map(lyc => (
                  <div className='lyric'>{lyc}</div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {/* {slides?.map(val => {
        if (typeof val === 'string') {
          return <div className='song-title'>{val}</div>
        }
        return val.map(lyc => lyc)
      })} */}
      {/* <div className='lyrics'>
        {songList.length &&
          songList[songIndex].lyrics[lyricIndex].map(text => {
            let title = lyricIndex === 0
            let prevLyrics =
              songList[songIndexRef.current].lyrics[
                lyricIndexRef.current - 1
              ] ?? false
            let nextLyrics =
              songList[songIndexRef.current].lyrics[
                lyricIndexRef.current + 1
              ] ?? false
            return (
              <>
                <p className='prev-lyrics'>
                  {prevLyrics ? `${nextLyrics[0]}...` : ''}
                </p>
                <p className={title && 'title-page'}>{text}</p>
                <p className='next-lyrics'>
                  {nextLyrics ? `${nextLyrics[0]}...` : ''}
                </p>
              </>
            )
          })}
      </div> */}
    </div>
  )
}

export default Slideshow
