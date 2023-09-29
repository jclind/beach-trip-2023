import React, { useState } from 'react'
import Modal from 'react-modal'
import './LyricsInputModal.scss'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#09090b',
    borderRadius: '5px',
    maxWidth: '80%',
  },
  overlay: {
    zIndex: '1000',
    background: 'rgba(0, 0, 0, 0.5)',
  },
}

type LyricsInputModalProps = {
  closeModal: () => void
  addSong: (title: string, lyrics: string[][], lyricText: string) => void
  isOpen: boolean
}

const LyricsInputModal = ({
  closeModal,
  addSong,
  isOpen,
}: LyricsInputModalProps) => {
  const [title, setTitle] = useState('')
  const [lyricText, setLyricsText] = useState('')

  const [formattedText, setFormattedText] = useState<string[][]>([])

  const handleLyricPaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    if (newValue.length <= 0) {
      setFormattedText([])
    } else {
      const newFormattedText = newValue.split('\n\n').map(el => {
        return el.split('\n')
      })
      setFormattedText(newFormattedText)
    }

    setLyricsText(newValue)
  }

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      // contentLabel='Example Modal'
    >
      <div className='add-lyrics-modal-content'>
        <div className='title'>Add Song Lyrics</div>
        <input
          type='text'
          placeholder='Title'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          rows={18}
          onChange={handleLyricPaste}
          value={lyricText}
          placeholder='Lyrics'
        ></textarea>
        <div className='actions'>
          <button className='cancel-btn' onClick={closeModal}>
            Cancel
          </button>
          <button
            className='confirm-btn'
            disabled={formattedText.length === 0}
            onClick={() => addSong(title, formattedText, lyricText)}
          >
            Add Song
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default LyricsInputModal
