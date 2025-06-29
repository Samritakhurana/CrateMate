interface ReplicaConfig {
  apiKey: string;
  projectId: string;
  personaId: string;
}

interface VideoResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  video_url?: string;
  thumbnail_url?: string;
  duration?: number;
  created_at?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class ReplicaAPI {
  private config: ReplicaConfig;
  private baseUrl = 'https://api.replica.ai/v1';

  constructor(config: ReplicaConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log('Making request to:', url);
    console.log('With headers:', {
      'Authorization': `Bearer ${this.config.apiKey.substring(0, 10)}...`,
      'Content-Type': 'application/json',
      'X-Project-ID': this.config.projectId
    });

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'X-Project-ID': this.config.projectId,
          'Accept': 'application/json',
          ...options.headers,
        },
        mode: 'cors',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Replica API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: url
        });
        throw new Error(`Replica API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Network error:', error);
      throw error;
    }
  }

  async generateVideo(text: string, options: {
    voice_id?: string;
    background?: string;
    subtitle?: boolean;
    quality?: 'low' | 'medium' | 'high';
  } = {}): Promise<VideoResponse> {
    console.log('Generating video with Replica API...', {
      text: text.substring(0, 100) + '...',
      personaId: this.config.personaId,
      options
    });

    // Ensure text is not too long for video generation
    const maxLength = 500;
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

    const payload = {
      persona_id: this.config.personaId,
      text: truncatedText,
      voice_settings: {
        stability: 0.8,
        similarity_boost: 0.8,
        style: 0.2,
        speed: 1.0,
      },
      video_settings: {
        background: options.background || 'transparent',
        resolution: '720p',
        format: 'mp4',
        quality: options.quality || 'medium',
      },
      subtitle: options.subtitle !== false,
      ...options,
    };

    console.log('Sending payload to Replica:', payload);

    try {
      const result = await this.makeRequest('/videos/generate', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      console.log('Video generation started:', result);
      return result;
    } catch (error) {
      console.error('Failed to generate video:', error);
      throw error;
    }
  }

  async getVideoStatus(videoId: string): Promise<VideoResponse> {
    console.log('Checking video status:', videoId);
    
    try {
      const result = await this.makeRequest(`/videos/${videoId}`);
      console.log('Video status:', result);
      return result;
    } catch (error) {
      console.error('Failed to get video status:', error);
      throw error;
    }
  }

  async pollVideoCompletion(videoId: string, maxAttempts = 30): Promise<VideoResponse> {
    console.log('Starting video polling for:', videoId);
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const status = await this.getVideoStatus(videoId);
        
        console.log(`Polling attempt ${attempt + 1}:`, status.status);
        
        if (status.status === 'completed') {
          console.log('Video completed successfully:', status);
          return status;
        }
        
        if (status.status === 'failed') {
          throw new Error('Video generation failed');
        }
        
        // Wait 2 seconds before next poll
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Polling attempt ${attempt + 1} failed:`, error);
        if (attempt === maxAttempts - 1) {
          throw error;
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error('Video generation timeout');
  }

  // Test API connection with a simple endpoint
  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing Replica API connection...');
      console.log('API Config:', {
        baseUrl: this.baseUrl,
        hasApiKey: !!this.config.apiKey,
        hasProjectId: !!this.config.projectId,
        hasPersonaId: !!this.config.personaId
      });
      
      // Try to get persona info or project info first
      const testEndpoint = `/personas/${this.config.personaId}`;
      
      try {
        await this.makeRequest(testEndpoint, {
          method: 'GET'
        });
        console.log('API connection test successful');
        return true;
      } catch (error) {
        console.log('Persona endpoint failed, trying alternative test...');
        
        // If persona endpoint fails, try a simple video generation test
        const testVideo = await this.generateVideo('Hello, this is a test message from James.', {
          subtitle: true,
          quality: 'low'
        });
        
        console.log('Test video generation started:', testVideo);
        return true;
      }
    } catch (error) {
      console.error('API connection test failed:', error);
      
      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('This appears to be a CORS or network connectivity issue');
      }
      
      return false;
    }
  }

  // Check if API is properly configured
  isConfigured(): boolean {
    const configured = !!(
      this.config.apiKey && 
      this.config.apiKey !== 'your_replica_api_key' &&
      this.config.projectId &&
      this.config.projectId !== 'your_replica_project_id' &&
      this.config.personaId &&
      this.config.personaId !== 'your_replica_persona_id'
    );
    
    console.log('API Configuration check:', {
      hasApiKey: !!this.config.apiKey,
      hasProjectId: !!this.config.projectId,
      hasPersonaId: !!this.config.personaId,
      configured
    });
    
    return configured;
  }
}

// Initialize Replica API with environment variables
const getReplicaConfig = (): ReplicaConfig => {
  const config = {
    apiKey: import.meta.env.VITE_REPLICA_API_KEY || 'a50d6ccfd3964f018e7116cef94e1fbd',
    projectId: import.meta.env.VITE_REPLICA_PROJECT_ID || 'r92debe21318',
    personaId: import.meta.env.VITE_REPLICA_PERSONA_ID || 'p5fad933f4bf',
  };
  
  console.log('Replica API Configuration:', {
    apiKey: config.apiKey.substring(0, 10) + '...',
    projectId: config.projectId,
    personaId: config.personaId,
    fromEnv: {
      apiKey: !!import.meta.env.VITE_REPLICA_API_KEY,
      projectId: !!import.meta.env.VITE_REPLICA_PROJECT_ID,
      personaId: !!import.meta.env.VITE_REPLICA_PERSONA_ID
    }
  });
  
  return config;
};

export const replicaAPI = new ReplicaAPI(getReplicaConfig());

export type { VideoResponse, ConversationMessage };