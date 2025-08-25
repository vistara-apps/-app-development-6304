import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export async function generateUIPreview(idea, features = []) {
  try {
    // Create prompt for UI generation
    const featureList = features.length > 0 
      ? `\n\nKey features to include:\n${features.map(f => `- ${f.description}`).join('\n')}`
      : ''

    const prompt = `Create a simple, interactive HTML preview for this app idea:

Title: ${idea.title}
Description: ${idea.description}${featureList}

Generate clean, modern HTML with inline CSS and JavaScript that demonstrates the core functionality. 
Include:
- A clean, professional design
- Interactive elements where appropriate
- Responsive layout
- Modern CSS styling
- Basic functionality simulation

Make it look like a real app preview that someone could interact with. 
Focus on the user interface and core user experience.
Use modern web standards and make it visually appealing.

Return only the HTML code with inline CSS and JavaScript - no markdown formatting.`

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    return response.choices[0]?.message?.content || '<p>Error generating preview</p>'
  } catch (error) {
    console.error('Error generating AI preview:', error)
    return `
      <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
        <h2 style="color: #333; margin-bottom: 20px;">${idea.title}</h2>
        <p style="color: #666; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          ${idea.description}
        </p>
        <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <p style="color: #888; font-size: 14px;">
            Preview generation temporarily unavailable. This would show an interactive demo of your app idea.
          </p>
        </div>
      </div>
    `
  }
}