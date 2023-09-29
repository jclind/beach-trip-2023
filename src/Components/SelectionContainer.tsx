import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import LyricsInputModal from './LyricsInputModal/LyricsInputModal'
import { AiOutlineClose } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { MdSlideshow } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'

export type SongListItemType = {
  title: string
  lyrics: string[][]
  id: string
  lyricText: string
}

const SelectionContainer = () => {
  const [songList, setSongList] = useState<SongListItemType[]>(() => {
    const storedStringifiedData = localStorage.getItem('songList') ?? null
    const data = storedStringifiedData
      ? JSON.parse(storedStringifiedData)
      : null
    if (data) return data
    return []
  })
  const [isLyricsInputModalOpen, setIsLyricsModalOpen] = useState(false)
  const navigate = useNavigate()

  const addSong = (title: string, lyrics: string[][], lyricText: string) => {
    const updatedLyrics = [...lyrics]
    setSongList([
      ...songList,
      { title, lyrics: updatedLyrics, id: uuidv4(), lyricText },
    ])

    setIsLyricsModalOpen(false)
  }
  const removeSong = (id: string) => {
    const updatedSongList = [...songList].filter(song => song.id !== id)
    setSongList(updatedSongList)
  }

  useEffect(() => {
    localStorage.setItem('songList', JSON.stringify(songList))
  }, [songList])

  const startSlideshow = () => {
    navigate('/slideshow')
  }

  return (
    <div className='selection-container'>
      <div className='song-list'>
        {songList.map((el, idx) => {
          const handleDeleteClick = (
            e: React.MouseEvent<SVGElement, MouseEvent>
          ) => {
            e.stopPropagation()

            removeSong(el.id)
          }

          return (
            <div className='song-thumbnail'>
              <div className='label'>Song #{idx + 1}</div>
              <button className='song-item' key={el.id}>
                <AiOutlineClose className='icon' onClick={handleDeleteClick} />
                <div className='title'>{el.title}</div>
                <div className='text'>{el.lyricText.substring(0, 125)}...</div>
              </button>
            </div>
          )
        })}
      </div>
      <div className='options'>
        <button
          className='add-song-btn'
          onClick={() => setIsLyricsModalOpen(true)}
        >
          <AiOutlinePlus className='icon' /> Add Song
        </button>
        <button className='start-slideshow' onClick={startSlideshow}>
          <MdSlideshow className='icon' /> Start Slideshow
        </button>
      </div>

      <LyricsInputModal
        closeModal={() => setIsLyricsModalOpen(false)}
        addSong={addSong}
        isOpen={isLyricsInputModalOpen}
      />
    </div>
  )
}

export default SelectionContainer
