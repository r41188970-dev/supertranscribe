import { motion } from 'framer-motion'
import AudioRecorder from './AudioRecorder'
import FileUploader from './FileUploader'
import TranscriptionDisplay from './TranscriptionDisplay'

export default function Hero() {
  return (
    <section className="relative z-10">
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 cosmic-text">
              Voice to Text
              <br />
              <span className="text-supernova-cyan">Like Magic ✨</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80">
              Transform your voice into text instantly with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AudioRecorder />
            <FileUploader />
          </div>

          <TranscriptionDisplay />
        </div>
      </div>
    </section>
  )
}
