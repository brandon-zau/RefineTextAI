import OpenAI from 'openai';
import {
  OPENAI_API_KEY
} from '@env';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true  // Required for client-side usage
});

// Define prompts for different tones
const toneDescriptions = {
  polite: "professional, courteous, and respectful",
  funny: "lighthearted, witty, and humorous while remaining appropriate",
  warm: "friendly, caring, and approachable",
  direct: "clear, concise, and to the point"
};

// Define category contexts
const categoryContexts = {
  business: "a professional business context",
  romantic: "a romantic or dating context",
  workplace: "a workplace communication between colleagues",
  parenting: "a parent communicating with their child"
};

export async function refineMessage(originalMessage, category, tone) {
  try {
    const toneDesc = toneDescriptions[tone] || "appropriate";
    const categoryContext = categoryContexts[category] || "general communication";
    
    const prompt = `Please rewrite the following message to be ${toneDesc} for ${categoryContext}. 
    
Original message: "${originalMessage}"

Provide 3 different variations of the refined message. Each variation should:
1. Maintain the core intent of the original message
2. Be appropriate for the ${category} context
3. Have a ${tone} tone
4. Be natural and authentic

Format your response as:
Version 1: [refined message]
Version 2: [refined message]
Version 3: [refined message]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that refines messages to improve communication. You maintain the original intent while adjusting tone and style appropriately."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    
    // Parse the response to extract the three versions
    const versions = content.split('\n')
      .filter(line => line.startsWith('Version'))
      .map((line, index) => {
        const message = line.replace(/Version \d+:\s*/, '').trim();
        return {
          id: String(index + 1),
          version: `Version ${index + 1}`,
          tone: tone.charAt(0).toUpperCase() + tone.slice(1),
          color: getColorForIndex(index),
          message: message
        };
      });

    return versions;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

function getColorForIndex(index) {
  const colors = ['#10b981', '#f97316', '#ec4899'];
  return colors[index % colors.length];
}

// Test function to verify API key works
export async function testOpenAIConnection() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say 'API Connected!'" }],
      max_tokens: 10,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI connection test failed:', error);
    throw error;
  }
}