import { create } from 'zustand'

const useStore = create((set) => ({
  transcription: '',
  language: 'en',
  transcriptions: [],
  
  setTranscription: (text) => set({ transcription: text }),
  setLanguage: (lang) => set({ language: lang }),
  setTranscriptions: (list) => set({ transcriptions: list }),
  clearTranscription: () => set({ transcription: '' })
}))

export default useStore
