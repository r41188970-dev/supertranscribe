import { motion } from 'framer-motion'
import { FaGlobe } from 'react-icons/fa'
import useStore from '../store/useStore'

export default function LanguageSelector() {
  const { language, setLanguage } = useStore()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ar', name: 'Arabic' },
    { code: 'tr', name: 'Turkish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-effect rounded-xl p-4 mb-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <FaGlobe className="text-2xl text-supernova-cyan" />
        <h3 className="text-lg font-bold">Select Language</h3>
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-supernova-cyan transition"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code} className="bg-space-dark">
            {lang.name}
          </option>
        ))}
      </select>
    </motion.div>
  )
}
