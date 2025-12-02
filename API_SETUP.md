# AI Image Generation API Setup

Your Intelligent Prompt application now supports **real AI image and video generation**! Here's how to set it up:

## 🚀 **Quick Start (No API Keys Required)**

The app works **immediately** with free services:
- **Pollinations AI** - Free image generation service
- No registration or API keys needed
- Just enter your prompt and generate!

## 🔧 **Optional API Keys for Premium Features**

For higher quality and more options, you can add these API keys to your environment:

### 1. **Hugging Face API (Recommended)**
- **Free tier available** with good quality
- Get your API key: https://huggingface.co/settings/tokens
- Add to your `.env` file: `VITE_HUGGING_FACE_API_KEY=your_key_here`

### 2. **OpenAI DALL-E API**
- **Premium service** with excellent quality
- Get your API key: https://platform.openai.com/api-keys
- Add to your `.env` file: `VITE_OPENAI_API_KEY=your_key_here`

### 3. **Google Gemini API**
- **Already configured** for prompt optimization
- Add to your `.env` file: `VITE_API_KEY=your_gemini_key_here`

## 📝 **Environment File Setup**

Create a `.env` file in your project root:

```env
# Optional API Keys
VITE_HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_API_KEY=your_gemini_api_key_here
```

## 🎨 **How It Works**

The app uses a **smart fallback system**:

1. **First**: Tries Pollinations AI (free, always works)
2. **Second**: If you have Hugging Face API key, uses that
3. **Third**: If you have OpenAI API key, uses DALL-E

## ✨ **Features**

- **Real AI Generation**: No more random placeholder images!
- **Multiple Styles**: Realistic, Artistic, Anime, Cinematic
- **Quality Options**: Standard, High Quality, Ultra HD
- **Aspect Ratios**: 16:9, 9:16, 1:1, 4:3
- **Error Handling**: Clear feedback if generation fails
- **Free Tier**: Works without any API keys

## 🔧 **Troubleshooting**

If image generation fails:
1. Check your internet connection
2. Try a simpler prompt
3. Make sure API keys are correctly set (if using them)
4. The app will show error messages to help debug

## 🎯 **Example Prompts**

Try these prompts to test the system:
- "A beautiful sunset over mountains"
- "A futuristic city with flying cars"
- "A cute cat wearing a space helmet"
- "Abstract art with vibrant colors"

The AI will generate unique images based on your descriptions!
