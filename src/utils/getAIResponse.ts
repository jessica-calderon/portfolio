import aiResponses from '../data/ai_responses.json';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Get AI response from OpenAI API or fallback to mock data
 * @param userMessage - The user's message
 * @param chatHistory - Previous messages for context
 * @returns Promise<string> - The AI's response
 */
export async function getAIResponse(
  userMessage: string,
  chatHistory: Message[] = []
): Promise<string> {
  // Check if we're in demo mode (GitHub Pages) or if API key is not available
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const useMockData = !apiKey || import.meta.env.MODE === 'production' || window.location.hostname.includes('github.io');

  if (useMockData) {
    // Use mock data for GitHub Pages demo
    return getMockResponse(userMessage);
  }

  try {
    // Try OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Jessica Calderon\'s AI Friend. Help visitors learn about Jessica, her portfolio, skills, case studies, and experience. Be friendly, informative, and concise. Keep responses under 200 words when possible.',
          },
          ...chatHistory.slice(-10), // Keep last 10 messages for context
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || getMockResponse(userMessage);
  } catch (error) {
    console.warn('OpenAI API error, using mock data:', error);
    // Fallback to mock data
    return getMockResponse(userMessage);
  }
}

/**
 * Get response from mock data based on user message keywords
 * @param userMessage - The user's message
 * @returns string - The mock response
 */
function getMockResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  const responses = aiResponses.responses;

  // Find the best matching response based on keywords
  let bestMatch = responses[responses.length - 1]; // Default fallback
  let maxMatches = 0;

  for (const response of responses) {
    const matches = response.keywords.filter(keyword => 
      message.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = response;
    }
  }

  return bestMatch.response;
}


