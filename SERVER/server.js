import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Multer setup with proper file extension preservation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SuperTranscribe API is running! 🚀' })
})

// Transcription endpoint
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' })
    }

    console.log('Received file:', req.file.originalname)
    console.log('Saved as:', req.file.filename)

    // Call Groq Whisper API with proper file
    const language = req.body.language || 
const transcription = await groq.audio.transcriptions.create({
  file: fs.createReadStream(req.file.path),
  model: 'whisper-large-v3',
  response_format: 'json',
  language: language
})


    const transcribedText = transcription.text

    console.log('✅ Transcription successful:', transcribedText)

    // Save to Supabase
    const { data, error } = await supabase
      .from('transcriptions')
      .insert([
        {
          text: transcribedText,
          file_name: req.file.originalname,
          created_at: new Date()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
    } else {
      console.log('✅ Saved to Supabase')
    }

    // Delete temporary file
    fs.unlinkSync(req.file.path)

    res.json({
      success: true,
      transcription: transcribedText,
      saved: !error
    })

  } catch (error) {
    console.error('❌ Transcription error:', error.message)
    
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(500).json({
      error: 'Transcription failed',
      details: error.message
    })
  }
})

// Get all transcriptions
app.get('/api/transcriptions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transcriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({ transcriptions: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
