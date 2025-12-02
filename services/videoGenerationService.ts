// Dedicated Video Generation Service with Comprehensive Datasets
import { 
  VideoGenerationOptions, 
  VIDEO_STYLE_DATASETS, 
  VIDEO_SCENE_DATASETS, 
  VIDEO_CAMERA_MOVEMENTS, 
  VIDEO_LIGHTING_DATASETS, 
  VIDEO_COLOR_PALETTES, 
  VIDEO_QUALITY_ENHANCERS 
} from './imageGenerationService';

// Google AI Video Generation using Gemini
export const generateVideoWithGemini = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // For now, we'll use the provided API key to generate a detailed video description
    // and then create a high-quality cinematic image that represents the video
    
    const apiKey = 'AIzaSyATePM6jEkbgLA6QskEWHjsZ1-NjsBrKOo';
    
    // Enhance the prompt using Gemini for better video generation
    const enhancedPrompt = await enhanceVideoPromptWithGemini(prompt, options, apiKey);
    
    // Generate a cinematic image using the enhanced prompt
    const videoPreviewUrl = await generateCinematicImage(enhancedPrompt, options);
    
    return videoPreviewUrl;
  } catch (error) {
    console.error('Gemini video generation failed:', error);
    throw error;
  }
};

// Enhance video prompt using Gemini AI
const enhanceVideoPromptWithGemini = async (
  prompt: string,
  options: VideoGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const enhancementPrompt = `
      Transform this video prompt into a detailed, cinematic description suitable for AI video generation:
      
      Original prompt: "${prompt}"
      Style: ${options.style}
      Duration: ${options.duration} seconds
      Aspect ratio: ${options.aspectRatio}
      
      Create a detailed description that includes:
      - Visual composition and framing
      - Lighting and atmosphere
      - Movement and dynamics
      - Color palette
      - Cinematic techniques
      
      Return only the enhanced prompt, no additional text.
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancementPrompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const enhancedPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text || prompt;
    
    return enhancedPrompt.trim();
  } catch (error) {
    console.error('Prompt enhancement failed:', error);
    return prompt; // Fallback to original prompt
  }
};

// Generate cinematic image for video preview
const generateCinematicImage = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // Use Pollinations AI with cinematic enhancements
    const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';
    
    const cinematicPrompt = `${prompt}, cinematic composition, movie scene, professional cinematography, dynamic lighting, ${options.style} style, high quality, detailed`;
    
    const params = new URLSearchParams({
      seed: Math.floor(Math.random() * 1000000).toString(),
      width: getWidthFromAspectRatio(options.aspectRatio).toString(),
      height: getHeightFromAspectRatio(options.aspectRatio).toString(),
      model: 'flux',
    });

    const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(cinematicPrompt)}?${params}`;
    
    // Validate the image loads
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageUrl);
      img.onerror = () => reject(new Error('Failed to generate video preview'));
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Cinematic image generation failed:', error);
    throw error;
  }
};

// Alternative: Simple video generation without external APIs
export const generateSimpleVideo = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // Create multiple frames for a simple slideshow effect
    const frames: string[] = [];
    const basePrompt = `${prompt}, ${options.style} style`;
    
    const frameVariations = [
      `${basePrompt}, establishing shot, wide angle`,
      `${basePrompt}, medium shot, balanced composition`,
      `${basePrompt}, close up, detailed view`,
      `${basePrompt}, dramatic angle, cinematic lighting`,
      `${basePrompt}, final shot, epic composition`
    ];

    // Generate frames
    for (let i = 0; i < Math.min(3, frameVariations.length); i++) {
      try {
        const frameUrl = await generateFrame(frameVariations[i], options);
        frames.push(frameUrl);
      } catch (error) {
        console.warn(`Frame ${i + 1} generation failed:`, error);
      }
    }

    if (frames.length === 0) {
      throw new Error('Failed to generate any video frames');
    }

    // Return the best frame as video preview
    return frames[0];
  } catch (error) {
    console.error('Simple video generation failed:', error);
    throw error;
  }
};

// Generate individual frame
const generateFrame = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';
  
  const params = new URLSearchParams({
    seed: Math.floor(Math.random() * 1000000).toString(),
    width: getWidthFromAspectRatio(options.aspectRatio).toString(),
    height: getHeightFromAspectRatio(options.aspectRatio).toString(),
    model: 'flux',
  });

  const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(prompt)}?${params}`;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = () => reject(new Error('Frame generation failed'));
    img.src = imageUrl;
  });
};

// Helper functions
const getWidthFromAspectRatio = (aspectRatio: string): number => {
  const ratios = {
    '16:9': 1024,
    '9:16': 576,
    '1:1': 768,
    '4:3': 896
  };
  return ratios[aspectRatio as keyof typeof ratios] || 768;
};

const getHeightFromAspectRatio = (aspectRatio: string): number => {
  const ratios = {
    '16:9': 576,
    '9:16': 1024,
    '1:1': 768,
    '4:3': 672
  };
  return ratios[aspectRatio as keyof typeof ratios] || 768;
};


