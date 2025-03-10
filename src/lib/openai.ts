import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeDepartments(companyInfo: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a business analyst expert who helps identify the most relevant departments to contact within a company based on the product or service being offered. Provide specific department recommendations with brief explanations."
      },
      {
        role: "user",
        content: `Based on this company information and product/service, what are the best departments to contact? Company info: ${companyInfo}`
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content;
} 