// Image Generation Service using multiple AI providers

export interface ImageGenerationOptions {
  style: string;
  quality: string;
  aspectRatio: string;
  model: string;
}

export interface VideoGenerationOptions extends ImageGenerationOptions {
  duration: string;
}

// Comprehensive Video Generation Datasets
export const VIDEO_STYLE_DATASETS = {
  realistic: {
    prompts: [
      "photorealistic, 4K resolution, natural lighting, documentary style",
      "cinéma vérité, handheld camera, authentic atmosphere",
      "professional cinematography, depth of field, bokeh effect",
      "natural color grading, realistic shadows and highlights"
    ],
    techniques: [
      "shallow depth of field", "natural lighting", "handheld movement",
      "realistic color palette", "authentic textures", "documentary approach"
    ]
  },
  cinematic: {
    prompts: [
      "Hollywood blockbuster style, dramatic lighting, epic composition",
      "film noir aesthetic, high contrast, moody atmosphere",
      "action movie cinematography, dynamic camera angles",
      "thriller movie style, suspenseful lighting, dramatic shadows"
    ],
    techniques: [
      "dramatic lighting", "wide angle shots", "tracking shots",
      "color grading", "lens flares", "epic compositions", "dutch angles"
    ]
  },
  artistic: {
    prompts: [
      "painterly style, impressionistic, artistic interpretation",
      "abstract expressionism, creative visual effects",
      "surreal artistic vision, dreamlike quality",
      "avant-garde cinematography, experimental techniques"
    ],
    techniques: [
      "artistic filters", "creative transitions", "abstract compositions",
      "experimental lighting", "surreal effects", "painterly textures"
    ]
  },
  anime: {
    prompts: [
      "anime style animation, cel shading, vibrant colors",
      "manga inspired visuals, Japanese animation style",
      "Studio Ghibli inspired, detailed animation",
      "modern anime aesthetic, dynamic action sequences"
    ],
    techniques: [
      "cel shading", "vibrant color palette", "dynamic poses",
      "speed lines", "anime expressions", "stylized lighting"
    ]
  }
};

export const VIDEO_SCENE_DATASETS = {
  nature: [
    "majestic mountain landscape with flowing rivers",
    "serene forest with sunlight filtering through trees",
    "ocean waves crashing against rocky cliffs",
    "golden sunset over rolling hills",
    "misty morning in a peaceful meadow"
  ],
  urban: [
    "bustling city street with neon lights",
    "modern skyscrapers reaching toward the sky",
    "cozy coffee shop with warm lighting",
    "busy marketplace with vibrant activity",
    "futuristic cityscape with flying vehicles"
  ],
  fantasy: [
    "magical forest with glowing mushrooms",
    "ancient castle on a floating island",
    "dragon soaring through cloudy skies",
    "enchanted garden with fairy lights",
    "mystical portal opening in space"
  ],
  scifi: [
    "spaceship traveling through nebula",
    "futuristic laboratory with holographic displays",
    "alien planet with multiple moons",
    "cyberpunk city with neon advertisements",
    "robot walking through abandoned facility"
  ]
};

export const VIDEO_CAMERA_MOVEMENTS = {
  static: ["fixed camera position", "steady shot", "locked off camera"],
  dynamic: [
    "smooth camera pan", "tracking shot", "dolly movement",
    "crane shot", "handheld movement", "steadicam flow"
  ],
  dramatic: [
    "dramatic zoom", "dutch angle tilt", "whip pan",
    "spiral camera movement", "vertigo effect", "crash zoom"
  ]
};

export const VIDEO_LIGHTING_DATASETS = {
  natural: [
    "golden hour lighting", "soft window light", "overcast daylight",
    "sunset backlighting", "dawn atmosphere"
  ],
  dramatic: [
    "high contrast lighting", "rim lighting", "dramatic shadows",
    "chiaroscuro effect", "spotlight effect"
  ],
  atmospheric: [
    "volumetric lighting", "god rays", "misty atmosphere",
    "neon lighting", "candlelight ambiance"
  ]
};

export const VIDEO_COLOR_PALETTES = {
  warm: ["golden tones", "orange and red palette", "sunset colors", "amber lighting"],
  cool: ["blue tones", "cyan and teal palette", "moonlight colors", "winter atmosphere"],
  vibrant: ["saturated colors", "rainbow palette", "neon colors", "pop art style"],
  muted: ["desaturated tones", "pastel colors", "vintage film look", "faded aesthetic"]
};

export const VIDEO_QUALITY_ENHANCERS = {
  technical: [
    "4K ultra high definition", "60fps smooth motion", "HDR color depth",
    "professional color grading", "film grain texture", "anamorphic lens effect"
  ],
  artistic: [
    "masterpiece quality", "award winning cinematography", "museum quality",
    "gallery exhibition standard", "professional film production"
  ]
};

// Hugging Face API integration (free tier available)
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';

// Alternative: Use OpenAI DALL-E API
const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';

// Pollinations AI (free service)
const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';

export const generateImage = async (
  prompt: string,
  options: ImageGenerationOptions
): Promise<string> => {
  try {
    // Method 1: Try Pollinations AI (free and reliable)
    const pollinationsResult = await generateWithPollinations(prompt, options);
    if (pollinationsResult) {
      return pollinationsResult;
    }

    // Method 2: Fallback to Hugging Face (requires API key)
    const hfApiKey = (import.meta as any).env?.VITE_HUGGING_FACE_API_KEY;
    if (hfApiKey) {
      const hfResult = await generateWithHuggingFace(prompt, options, hfApiKey);
      if (hfResult) {
        return hfResult;
      }
    }

    // Method 3: Fallback to OpenAI DALL-E (requires API key)
    const openaiApiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY;
    if (openaiApiKey) {
      const openaiResult = await generateWithOpenAI(prompt, options, openaiApiKey);
      if (openaiResult) {
        return openaiResult;
      }
    }

    throw new Error('No available image generation service');
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
};

// Pollinations AI - Free service with no watermarks
const generateWithPollinations = async (
  prompt: string,
  options: ImageGenerationOptions
): Promise<string> => {
  try {
    // Enhance prompt based on style and add quality modifiers
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    const qualityPrompt = `${enhancedPrompt}, high quality, no watermark, clean image, professional`;
    
    // Build URL with parameters for best quality
    const params = new URLSearchParams({
      seed: Math.floor(Math.random() * 1000000).toString(),
      width: getWidthFromAspectRatio(options.aspectRatio).toString(),
      height: getHeightFromAspectRatio(options.aspectRatio).toString(),
      model: 'flux', // Always use best model
      nologo: 'true', // Remove watermarks
      private: 'true', // Better quality
    });

    const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(qualityPrompt)}?${params}`;
    
    // Test if the image loads successfully
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageUrl);
      img.onerror = () => reject(new Error('Failed to load generated image'));
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Pollinations generation failed:', error);
    throw error;
  }
};

// Hugging Face Inference API
const generateWithHuggingFace = async (
  prompt: string,
  options: ImageGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          num_inference_steps: options.quality === 'ultra' ? 50 : options.quality === 'high' ? 30 : 20,
          guidance_scale: 7.5,
          width: getWidthFromAspectRatio(options.aspectRatio),
          height: getHeightFromAspectRatio(options.aspectRatio),
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Hugging Face generation failed:', error);
    throw error;
  }
};

// OpenAI DALL-E API
const generateWithOpenAI = async (
  prompt: string,
  options: ImageGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        n: 1,
        size: getSizeFromAspectRatio(options.aspectRatio),
        quality: options.quality === 'ultra' ? 'hd' : 'standard',
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('OpenAI generation failed:', error);
    throw error;
  }
};

// Import real video generation
import { generateRealVideo } from './realVideoService';

// Enhanced Video Generation - Focuses on USER INPUT accuracy
export const generateVideo = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // Enhance prompt minimally to preserve user intent
    const enhancedPrompt = enhanceVideoPromptWithDatasets(prompt, options);
    
    // Method 1: Create actual video from frames (most reliable for playback)
    try {
      const videoResult = await generateActualVideoFromFrames(enhancedPrompt, options);
      if (videoResult) {
        return videoResult;
      }
    } catch (error) {
      console.warn('Video from frames failed, trying other methods:', error);
    }

    // Method 2: Try real video generation
    try {
      const realVideoResult = await generateRealVideo(enhancedPrompt, options);
      if (realVideoResult) {
        return realVideoResult;
      }
    } catch (error) {
      console.warn('Real video generation failed:', error);
    }

    // Method 3: Use Gemini enhancement (but keep user input focus)
    const geminiResult = await generateVideoWithGemini(enhancedPrompt, options);
    if (geminiResult) {
      return geminiResult;
    }

    // Method 4: Simple image fallback (last resort)
    const simpleResult = await generateSimpleVideo(enhancedPrompt, options);
    if (simpleResult) {
      return simpleResult;
    }

    throw new Error('All video generation methods failed');
  } catch (error) {
    console.error('Video generation failed:', error);
    throw error;
  }
};

// Generate actual playable video from multiple frames
const generateActualVideoFromFrames = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    const duration = parseInt(options.duration);
    const frameCount = Math.max(3, Math.min(duration, 10)); // 3-10 frames based on duration
    const frames: string[] = [];
    
    // Generate frames that follow the user's prompt closely
    for (let i = 0; i < frameCount; i++) {
      const framePrompt = `${prompt}, frame ${i + 1}, sequence, ${options.style} style`;
      
      try {
        const frameUrl = await generateFrameForVideo(framePrompt, options);
        frames.push(frameUrl);
      } catch (error) {
        console.warn(`Frame ${i + 1} generation failed:`, error);
      }
    }

    if (frames.length === 0) {
      throw new Error('No frames generated for video');
    }

    // Create actual video file from frames
    return await createPlayableVideoFromFrames(frames, duration);
  } catch (error) {
    console.error('Video from frames generation failed:', error);
    throw error;
  }
};

// Generate frame specifically for video (follows user prompt closely)
const generateFrameForVideo = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';
  
  const params = new URLSearchParams({
    seed: Math.floor(Math.random() * 100000).toString(), // Less random variation
    width: getWidthFromAspectRatio(options.aspectRatio).toString(),
    height: getHeightFromAspectRatio(options.aspectRatio).toString(),
    model: 'flux',
    nologo: 'true',
    enhance: 'false', // Don't over-enhance to preserve user intent
  });

  const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(prompt)}?${params}`;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = () => reject(new Error('Frame generation failed'));
    img.src = imageUrl;
  });
};

// Create actual playable video from frames using Canvas and MediaRecorder
const createPlayableVideoFromFrames = async (
  frames: string[],
  duration: number
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      canvas.width = 1280;
      canvas.height = 720;

      // Check if MediaRecorder is supported
      if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        console.warn('VP9 not supported, falling back to VP8');
        if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
          throw new Error('WebM video recording not supported');
        }
      }

      const stream = canvas.captureStream(24); // 24 FPS for smooth playback
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
          ? 'video/webm;codecs=vp9' 
          : 'video/webm;codecs=vp8'
      });

      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        resolve(videoUrl);
      };

      mediaRecorder.onerror = (event) => {
        reject(new Error('MediaRecorder error: ' + event));
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms

      // Animate through frames
      const frameDuration = (duration * 1000) / frames.length; // Duration per frame in ms
      let currentFrameIndex = 0;

      const loadAndDrawFrame = (frameUrl: string): Promise<void> => {
        return new Promise((resolveFrame, rejectFrame) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolveFrame();
          };
          
          img.onerror = () => rejectFrame(new Error('Failed to load frame'));
          img.src = frameUrl;
        });
      };

      // Animate frames
      const animateFrames = async () => {
        for (let i = 0; i < frames.length; i++) {
          await loadAndDrawFrame(frames[i]);
          
          // Hold frame for specified duration
          await new Promise(resolve => setTimeout(resolve, frameDuration));
        }

        // Stop recording after all frames
        setTimeout(() => {
          mediaRecorder.stop();
        }, 100);
      };

      // Start animation
      animateFrames().catch(reject);

    } catch (error) {
      reject(error);
    }
  });
};

// Enhanced prompt generation - PRESERVES USER INPUT while adding minimal enhancements
const enhanceVideoPromptWithDatasets = (
  prompt: string,
  options: VideoGenerationOptions
): string => {
  const style = options.style as keyof typeof VIDEO_STYLE_DATASETS;
  
  // Get style-specific enhancements but keep them minimal and relevant
  const styleData = VIDEO_STYLE_DATASETS[style] || VIDEO_STYLE_DATASETS.realistic;
  
  // Only add basic style enhancement, not random elements
  let enhancement = '';
  switch (style) {
    case 'realistic':
      enhancement = 'photorealistic, natural lighting';
      break;
    case 'cinematic':
      enhancement = 'cinematic lighting, movie scene';
      break;
    case 'artistic':
      enhancement = 'artistic style, creative interpretation';
      break;
    case 'anime':
      enhancement = 'anime style, cel shading';
      break;
    default:
      enhancement = 'high quality';
  }
  
  // Add quality based on user selection
  const qualityEnhancement = options.quality === 'ultra' ? 'ultra high definition, masterpiece quality' :
                            options.quality === 'high' ? 'high quality, detailed' :
                            'good quality';
  
  // PRESERVE USER INPUT as the primary focus, only add minimal technical enhancements
  return `${prompt}, ${enhancement}, ${qualityEnhancement}, professional production`;
};

// Enhanced video generation method
const generateEnhancedVideo = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // Generate multiple high-quality frames with different techniques
    const frameCount = Math.min(parseInt(options.duration), 8);
    const frames: string[] = [];
    
    for (let i = 0; i < frameCount; i++) {
      // Add frame-specific enhancements
      const frameProgress = i / (frameCount - 1);
      const framePrompt = addFrameSpecificEnhancements(prompt, frameProgress, options);
      
      try {
        const frameUrl = await generateEnhancedFrame(framePrompt, options);
        frames.push(frameUrl);
      } catch (error) {
        console.warn(`Frame ${i + 1} generation failed:`, error);
      }
    }

    if (frames.length === 0) {
      throw new Error('No frames generated');
    }

    // Return the best frame as video preview (in a real implementation, this would create an actual video)
    return frames[0];
  } catch (error) {
    console.error('Enhanced video generation failed:', error);
    throw error;
  }
};

// Generate enhanced frame with datasets
const generateEnhancedFrame = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';
  
  const params = new URLSearchParams({
    seed: Math.floor(Math.random() * 1000000).toString(),
    width: getWidthFromAspectRatio(options.aspectRatio).toString(),
    height: getHeightFromAspectRatio(options.aspectRatio).toString(),
    model: 'flux',
    nologo: 'true',
    enhance: 'true',
    quality: options.quality === 'ultra' ? '100' : options.quality === 'high' ? '85' : '70'
  });

  const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(prompt)}?${params}`;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = () => reject(new Error('Enhanced frame generation failed'));
    img.src = imageUrl;
  });
};

// Add frame-specific enhancements for animation
const addFrameSpecificEnhancements = (
  prompt: string,
  progress: number,
  options: VideoGenerationOptions
): string => {
  const frameEnhancements = [
    "establishing shot, wide composition",
    "medium shot, balanced framing", 
    "close-up detail, intimate perspective",
    "dramatic angle, dynamic composition",
    "final shot, epic conclusion"
  ];
  
  const frameIndex = Math.floor(progress * (frameEnhancements.length - 1));
  const frameEnhancement = frameEnhancements[frameIndex];
  
  // Add temporal progression
  const temporalWords = progress < 0.3 ? "beginning, introduction" : 
                       progress < 0.7 ? "middle, development" : 
                       "climax, conclusion";
  
  return `${prompt}, ${frameEnhancement}, ${temporalWords}, smooth transition, cinematic flow`;
};

// Import the new video generation functions
const generateVideoWithGemini = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    const apiKey = 'AIzaSyATePM6jEkbgLA6QskEWHjsZ1-NjsBrKOo';
    
    // Enhance the prompt using Gemini
    const enhancedPrompt = await enhanceVideoPromptWithGemini(prompt, options, apiKey);
    
    // Generate cinematic image
    const videoPreviewUrl = await generateCinematicImage(enhancedPrompt, options);
    
    return videoPreviewUrl;
  } catch (error) {
    console.error('Gemini video generation failed:', error);
    throw error;
  }
};

const enhanceVideoPromptWithGemini = async (
  prompt: string,
  options: VideoGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const enhancementPrompt = `Transform this into a detailed cinematic description: "${prompt}" (${options.style} style, ${options.duration}s, ${options.aspectRatio}). Include visual composition, lighting, movement, and cinematic techniques. Return only the enhanced prompt.`;

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
    return prompt;
  }
};

const generateCinematicImage = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    const cinematicPrompt = `${prompt}, cinematic composition, movie scene, professional cinematography, dynamic lighting, ${options.style} style, high quality, detailed`;
    
    const params = new URLSearchParams({
      seed: Math.floor(Math.random() * 1000000).toString(),
      width: getWidthFromAspectRatio(options.aspectRatio).toString(),
      height: getHeightFromAspectRatio(options.aspectRatio).toString(),
      model: 'flux',
    });

    const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(cinematicPrompt)}?${params}`;
    
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

const generateSimpleVideo = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // Keep the user's prompt as the main focus, minimal enhancement
    const basePrompt = `${prompt}, ${options.style} style`;
    
    const params = new URLSearchParams({
      seed: Math.floor(Math.random() * 10000).toString(), // Less randomness
      width: getWidthFromAspectRatio(options.aspectRatio).toString(),
      height: getHeightFromAspectRatio(options.aspectRatio).toString(),
      model: 'flux',
      nologo: 'true',
    });

    const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(basePrompt)}?${params}`;
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageUrl);
      img.onerror = () => reject(new Error('Video generation failed'));
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Simple video generation failed:', error);
    throw error;
  }
};

// Helper functions
const enhancePromptForStyle = (prompt: string, style: string): string => {
  const styleEnhancements = {
    realistic: 'photorealistic, high detail, professional photography',
    artistic: 'artistic, painterly, creative interpretation, fine art',
    anime: 'anime style, manga, Japanese animation, cel shading',
    cinematic: 'cinematic lighting, movie scene, dramatic composition, film still'
  };

  const enhancement = styleEnhancements[style as keyof typeof styleEnhancements] || '';
  return `${prompt}, ${enhancement}`;
};

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

const getSizeFromAspectRatio = (aspectRatio: string): string => {
  const sizes = {
    '16:9': '1792x1024',
    '9:16': '1024x1792',
    '1:1': '1024x1024',
    '4:3': '1344x1024'
  };
  return sizes[aspectRatio as keyof typeof sizes] || '1024x1024';
};

// Alternative free video generation using Replicate
const generateWithLumaAI = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    // Use a simpler approach - generate a high-quality image and simulate video
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    
    // For now, create a "video preview" using a high-quality image
    // This avoids CORS issues while we implement proper video generation
    const imageUrl = await generateWithPollinations(enhancedPrompt, options);
    
    // Return the image as a video placeholder
    // In production, you'd implement actual video generation here
    return imageUrl;
  } catch (error) {
    console.error('Video generation failed:', error);
    throw error;
  }
};

// Runway ML Gen-3 API
const generateWithRunwayML = async (
  prompt: string,
  options: VideoGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const RUNWAY_API_URL = 'https://api.runwayml.com/v1/image_to_video';
    
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    
    // First generate an image, then convert to video
    const imageUrl = await generateWithPollinations(enhancedPrompt, options);
    
    const response = await fetch(RUNWAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        promptText: enhancedPrompt,
        duration: parseInt(options.duration),
        ratio: options.aspectRatio,
      }),
    });

    if (!response.ok) {
      throw new Error(`Runway ML API error: ${response.statusText}`);
    }

    const data = await response.json();
    return await pollForVideoCompletion(data.id, 'runway');
  } catch (error) {
    console.error('Runway ML generation failed:', error);
    throw error;
  }
};

// Pika Labs API
const generateWithPikaLabs = async (
  prompt: string,
  options: VideoGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const PIKA_API_URL = 'https://api.pika.art/generate/video';
    
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    
    const response = await fetch(PIKA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        duration: parseInt(options.duration),
        aspect_ratio: options.aspectRatio,
        style: options.style,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pika Labs API error: ${response.statusText}`);
    }

    const data = await response.json();
    return await pollForVideoCompletion(data.task_id, 'pika');
  } catch (error) {
    console.error('Pika Labs generation failed:', error);
    throw error;
  }
};

// Stable Video Diffusion via Hugging Face
const generateWithStableVideoDiffusion = async (
  prompt: string,
  options: VideoGenerationOptions,
  apiKey: string
): Promise<string> => {
  try {
    const SVD_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-video-diffusion-img2vid-xt';
    
    // First generate a seed image
    const seedImage = await generateWithHuggingFace(prompt, options, apiKey);
    
    const response = await fetch(SVD_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          image: seedImage,
          num_frames: Math.min(parseInt(options.duration) * 8, 25), // 8 fps max 25 frames
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Stable Video Diffusion API error: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Stable Video Diffusion generation failed:', error);
    throw error;
  }
};

// Create animated slideshow from AI images (reliable fallback)
const generateAnimatedSlideshow = async (
  prompt: string,
  options: VideoGenerationOptions
): Promise<string> => {
  try {
    const enhancedPrompt = enhancePromptForStyle(prompt, options.style);
    
    // Generate a single high-quality image with video-like characteristics
    const videoStylePrompt = `${enhancedPrompt}, cinematic composition, dynamic lighting, movie scene, high quality`;
    
    // Add random seed for variety
    const seed = Math.floor(Math.random() * 1000000);
    const params = new URLSearchParams({
      seed: seed.toString(),
      width: getWidthFromAspectRatio(options.aspectRatio).toString(),
      height: getHeightFromAspectRatio(options.aspectRatio).toString(),
      model: options.model === 'advanced' ? 'flux' : 'turbo',
    });

    const imageUrl = `${POLLINATIONS_API_URL}/${encodeURIComponent(videoStylePrompt)}?${params}`;
    
    // Test if the image loads successfully
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageUrl);
      img.onerror = () => reject(new Error('Failed to generate video preview'));
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Video preview generation failed:', error);
    throw error;
  }
};

// Helper function to poll for video completion
const pollForVideoCompletion = async (
  taskId: string,
  provider: 'luma' | 'runway' | 'pika'
): Promise<string> => {
  const maxAttempts = 30; // 5 minutes max
  const pollInterval = 10000; // 10 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      let statusUrl: string;
      let authHeader: string;

      switch (provider) {
        case 'luma':
          statusUrl = `https://api.lumalabs.ai/dream-machine/v1/generations/${taskId}`;
          authHeader = `Bearer ${(import.meta as any).env?.VITE_LUMA_API_KEY || 'demo'}`;
          break;
        case 'runway':
          statusUrl = `https://api.runwayml.com/v1/tasks/${taskId}`;
          authHeader = `Bearer ${(import.meta as any).env?.VITE_RUNWAY_API_KEY}`;
          break;
        case 'pika':
          statusUrl = `https://api.pika.art/task/${taskId}`;
          authHeader = `Bearer ${(import.meta as any).env?.VITE_PIKA_API_KEY}`;
          break;
        default:
          throw new Error('Unknown provider');
      }

      const response = await fetch(statusUrl, {
        headers: { 'Authorization': authHeader }
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 'completed' || data.state === 'SUCCEEDED') {
        return data.video_url || data.result?.video_url || data.output;
      }

      if (data.status === 'failed' || data.state === 'FAILED') {
        throw new Error('Video generation failed on server');
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    } catch (error) {
      console.warn(`Poll attempt ${attempt + 1} failed:`, error);
      if (attempt === maxAttempts - 1) {
        throw new Error('Video generation timed out');
      }
    }
  }

  throw new Error('Video generation timed out');
};

// Create slideshow video using Canvas API
const createSlideshowVideo = async (
  imageUrls: string[],
  duration: number
): Promise<string> => {
  try {
    // This is a simplified implementation
    // In a real app, you'd use libraries like FFmpeg.js or MediaRecorder API
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    canvas.width = 1280;
    canvas.height = 720;

    const frameDuration = duration / imageUrls.length;
    const fps = 24;
    const totalFrames = duration * fps;

    // For now, return the first image as a placeholder
    // In production, you'd create an actual video file
    return imageUrls[0];
  } catch (error) {
    console.error('Slideshow creation failed:', error);
    return imageUrls[0]; // Fallback to first image
  }
};
