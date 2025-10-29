import { motion } from 'framer-motion'
import { FaBolt, FaGlobe, FaShieldAlt, FaRocket } from 'react-icons/fa'

export default function Features() {
  const features = [
    {
      icon: <FaBolt className="text-4xl text-supernova-pink" />,
      title: 'Lightning Fast',
      description: 'Powered by Groq AI for instant transcription'
    },
    {
      icon: <FaGlobe className="text-4xl text-supernova-cyan" />,
      title: 'Multi-Language',
      description: 'Supports 50+ languages worldwide'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-supernova-purple" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: <FaRocket className="text-4xl text-supernova-blue" />,
      title: 'Easy to Use',
      description: 'Record or upload - it\'s that simple'
    }
  ]

  return (
    <div id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
        >
          Why Choose SuperTranscribe?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
