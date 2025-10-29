import { motion } from 'framer-motion'
import { FaMicrophone } from 'react-icons/fa'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaMicrophone className="text-3xl text-supernova-pink" />
            </motion.div>
            <h1 className="text-2xl font-bold glow-text">
              Super<span className="text-supernova-cyan">Transcribe</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-supernova-pink transition">Features</a>
            <a href="#pricing" className="hover:text-supernova-cyan transition">Pricing</a>
            <a href="#about" className="hover:text-supernova-purple transition">About</a>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
