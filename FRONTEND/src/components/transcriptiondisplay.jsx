import { motion } from 'framer-motion'
import { FaCopy, FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify'
import useStore from '../store/useStore'

export default function TranscriptionDisplay() {
  const { transcription } = useStore()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription)
    toast.success('📋 Copied to clipboard!')
  }

  const downloadText = () => {
    const blob = new Blob([transcription], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transcription.txt'
    a.click()
    toast.success('📥 Downloaded!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-8 mt-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Transcription Result</h3>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className="p-3 bg-supernova-purple rounded-lg hover:bg-supernova-pink transition"
          >
            <FaCopy />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={downloadText}
            className="p-3 bg-supernova-cyan rounded-lg hover:bg-supernova-blue transition"
          >
            <FaDownload />
          </motion.button>
        </div>
      </div>
      <div className="bg-black/30 rounded-lg p-6 max-h-96 overflow-y-auto">
        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
          {transcription}
        </p>
      </div>
    </motion.div>
  )
}
