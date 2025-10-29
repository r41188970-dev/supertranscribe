import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SpaceBackground from './components/SpaceBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'

function App() {
  return (
    <div className="min-h-screen bg-space-dark text-white overflow-x-hidden">
      <SpaceBackground />
      <Header />
      <Hero />
      <Features />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </div>
  )
}

export default App
