# Text To Image Generation With Stable Diffusion

A comprehensive AI-powered platform that combines intelligent prompt optimization with multi-modal AI content generation. Transform your ideas into optimized prompts and generate images, videos, voice, and music using cutting-edge AI technologies.

## Features

### Intelligent Prompt Optimizer
- Uses Google Gemini AI to optimize your prompts
- Select target audience: General, Technical, Creative, Academic, Business
- Choose optimization goals: Clarity, Detail, Creativity, Structure, Conciseness
- Get optimized prompts instantly

### Text-to-Image Generation
- Multiple AI models available: Pollinations AI (free), Hugging Face, OpenAI DALL-E
- Style options: Realistic, Artistic, Anime, Cinematic
- Quality levels: Standard, High Quality, Ultra HD
- Aspect ratios: 16:9, 9:16, 1:1, 4:3
- Works without API keys using free services

### Text-to-Video Generation
- AI-enhanced prompts with Gemini-powered cinematic descriptions
- Multiple generation methods including frame-based video and real video generation
- Professional quality with cinematic compositions and lighting
- Creates actual playable video files from frames
- Customizable video length

### Text-to-Voice Generation
- Convert text to realistic voice
- Multiple voice options and settings available
- Professional quality audio output

### Text-to-Music Generation
- AI-powered music composition using Gemini
- Multiple genres: Classical, Jazz, Electronic, Rock, Ambient, Folk
- Mood selection: Happy, Sad, Energetic, Calm, Mysterious, Dramatic
- Musical intelligence features:
  - Genre-specific scales and instruments
  - Mood-based dynamics and tempos
  - ADSR envelope synthesis
  - Sophisticated rhythm patterns
- Maps text emotions and patterns to musical elements
- WAV format output with advanced synthesis

### Biometric Authentication
- Fingerprint support with Touch ID and Windows Hello
- Face recognition with Face ID on compatible devices
- 24-hour secure sessions
- Auto-detects biometric capabilities

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone or download the repository
   ```bash
   cd "Text to Image Generation"
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables (optional)
   
   Create a `.env` file in the root directory:
   ```env
   # Required for prompt optimization
   VITE_API_KEY=your_gemini_api_key_here
   
   # Optional - for premium image generation
   VITE_HUGGING_FACE_API_KEY=your_hugging_face_key
   VITE_OPENAI_API_KEY=your_openai_key
   ```

   Note: The app works without API keys using free services, but adding them unlocks premium features.

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Prompt Optimization
1. Navigate to the Prompt page
2. Enter your original prompt
3. Select target audience and optimization goal
4. Click "Optimize Prompt"
5. Review and use the enhanced prompt

### Image Generation
1. Go to Media Generation page
2. Enter your image description
3. Choose style (Realistic, Artistic, Anime, Cinematic)
4. Select quality and aspect ratio
5. Click "Generate Image"
6. Download or enhance the result

### Video Generation
1. Navigate to Media Generation → Video tab
2. Describe the video scene you want
3. Configure style, quality, duration
4. Click "Generate Video"
5. Wait for AI processing
6. Download the generated video

### Music Generation
1. Go to Text to Music page
2. Enter text or lyrics to inspire the music
3. Select genre (Classical, Jazz, Electronic, Rock, Ambient, Folk)
4. Choose mood (Happy, Sad, Energetic, Calm, Mysterious, Dramatic)
5. Pick instruments and set tempo/duration
6. Click "Generate Music"
7. Listen and download the composition

## Tech Stack

### Frontend
- React 19.1.1 - Modern UI framework
- TypeScript 5.8.2 - Type-safe development
- Vite 6.2.0 - Fast build tool and dev server

### AI Services
- Google Gemini AI - Prompt optimization and music enhancement
- Pollinations AI - Free image/video generation
- Hugging Face - Stable Diffusion models (optional)
- OpenAI DALL-E - Premium image generation (optional)

### Audio Processing
- Web Audio API - Advanced music synthesis
- ADSR Synthesis - Professional sound envelope
- WAV Generation - High-quality audio output

### Authentication
- Web Authentication API - Biometric authentication
- WebAuthn - Passwordless login
- Local Storage - Session management

## Project Structure

```
Text to Image Generation/
├── components/                # React components
│   ├── AuthPage.tsx          # Authentication UI
│   ├── LandingPage.tsx       # Landing page
│   ├── MediaGenerationPage.tsx  # Image generation
│   ├── PromptInput.tsx       # Prompt input form
│   ├── OptimizedOutput.tsx   # Results display
│   ├── TextToVoicePage.tsx   # Voice generation
│   ├── TextToMusicPage.tsx   # Music generation
│   └── ThankYouPage.tsx      # Thank you page
├── services/                  # Service modules
│   ├── geminiService.ts      # Gemini AI integration
│   ├── imageGenerationService.ts  # Image generation
│   ├── videoGenerationService.ts  # Video generation
│   ├── musicGenerationService.ts  # Music composition
│   ├── biometricService.ts   # Authentication
│   └── realVideoService.ts   # Video processing
├── App.tsx                    # Main application
├── types.ts                   # TypeScript types
├── package.json               # Dependencies
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── README.md                 # This file
```

## Example Prompts

### Image Generation
- "A futuristic city with flying cars at sunset, cyberpunk style"
- "A serene Japanese garden with cherry blossoms, anime style"
- "A photorealistic portrait of a cat wearing astronaut helmet"
- "Abstract art with vibrant purple and cyan gradients"

### Video Generation
- "A car driving through a neon-lit futuristic city at night"
- "Ocean waves crashing against rocky cliffs at golden hour"
- "A dragon soaring majestically through cloudy mountain peaks"
- "Time-lapse of a flower blooming in spring garden"

### Music Generation
- Classical: "A peaceful morning in the countryside"
- Jazz: "Late night in a smoky jazz club"
- Electronic: "Dancing under neon lights in the city"
- Ambient: "Floating through space among the stars"

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Google Gemini API key | Yes (for optimization) |
| `VITE_HUGGING_FACE_API_KEY` | Hugging Face API key | No |
| `VITE_OPENAI_API_KEY` | OpenAI API key | No |

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## API Documentation

See the following files for detailed API setup:
- [API_SETUP.md](./API_SETUP.md) - API configuration guide
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Troubleshooting guide

## Troubleshooting

### "Failed to fetch" Error
- Check your API keys in `.env`
- Verify internet connection
- Try using free services (Pollinations AI) without keys
- Check browser console for detailed errors

### Image/Video Not Generating
- Simplify your prompt
- Try different style options
- Check network tab in browser DevTools
- Ensure API services are accessible

### Music Not Playing
- Enable audio in browser
- Check browser audio permissions
- Verify Web Audio API support
- Try different genres/moods

### Biometric Auth Not Working
- Ensure HTTPS connection (required for WebAuthn)
- Check device biometric capabilities
- Verify browser supports Web Authentication API
- Try fallback password authentication

## Acknowledgments

- Google Gemini AI for prompt optimization
- Pollinations AI for free image generation
- Hugging Face for AI model hosting
- Web Audio API for music synthesis
- The open-source community

---

Made using AI technologies  
Copyright 2024 Intelligent Prompt Optimizer
