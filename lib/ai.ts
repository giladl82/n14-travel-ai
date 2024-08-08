'use server'
import { buildUserPrompt, systemPrompt } from './prompt';
import { tripDetailsSchema } from './schema';
import OpenAI from 'openai';

const openAI = new OpenAI();

export async function callAI(tripDetails: FormData) {
  const parsed = tripDetailsSchema.safeParse(Object.fromEntries(tripDetails));

  if (!parsed.success) {
    throw new Error('Invalid trip info');
  }  try {
    const prompt = buildUserPrompt(parsed.data);

    const response = await openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4',
      response_format: { type: 'text' },
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
