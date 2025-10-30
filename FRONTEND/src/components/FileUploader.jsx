import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUpload } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import useStore from '../store/useStore'

export default function FileUploader() {
  const [isLoading, setIsLoading] = useState(false)
  const { setTranscription } = useStore()

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/webm', 'audio/ogg']
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid audio file')
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append('audio', file)
formData.append('language', useStore.getState().language)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transcribe`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setTranscription(response.data.transcription)
      toast.success('✅ File transcribed successfully!')
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
      <h3 className="text-2xl font-bold mb-4">Upload Audio</h3>
      <label
        htmlFor="file-upload"
        className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer bg-gradient-to-r from-supernova-cyan to-supernova-blue hover:shadow-2xl transition-all ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FaUpload className="text-4xl" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="hidden"
      />
      <p className="text-sm text-gray-400">
        {isLoading ? 'Processing...' : 'Click to upload audio file'}
      </p>
    </motion.div>
  )
}
