import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaMicrophone, FaStop } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import useStore from '../store/useStore'

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const { setTranscription } = useStore()

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        await transcribeAudio(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      toast.info('🎙️ Recording started...')
    } catch (error) {
      toast.error('Microphone access denied')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const transcribeAudio = async (audioBlob) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')
formData.append('language', useStore.getState().language)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transcribe`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setTranscription(response.data.transcription)
      toast.success('✅ Transcription complete!')
    } catch (error) {
      toast.error('Transcription failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass-effect rounded-2xl p-8 text-center"
    >
      <h3 className="text-2xl font-bold mb-4">Record Audio</h3>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading}
        className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
          isRecording
            ? 'bg-red-500 animate-pulse'
            : 'bg-gradient-to-r from-supernova-pink to-supernova-purple hover:shadow-2xl'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isRecording ? (
          <FaStop className="text-4xl" />
        ) : (
          <FaMicrophone className="text-4xl" />
        )}
      </motion.button>
      <p className="text-sm text-gray-400">
        {isLoading ? 'Transcribing...' : isRecording ? 'Click to stop' : 'Click to start recording'}
      </p>
    </motion.div>
  )
}
