import { streamText } from 'ai';
import { openai as openAI } from '@ai-sdk/openai';
import { buildUserPrompt, systemPrompt } from '@/lib/prompt';

export async function POST(req: Request) {
  const details = await req.json();

  const prompt = buildUserPrompt(details);
  const result = await streamText({
    model: openAI('gpt-4o-2024-05-13'),
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
    
  });

  return result.toTextStreamResponse();
}
