// pages/api/generate.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const messages = [];

export default async function handler(req, res) {
  messages.push({ role: 'user', content: req.body.query });

  let completion = {};

  try {
    let messages_data = {
      model: 'gpt-3.5-turbo',
      messages: messages,
    };

    completion = await openai.createChatCompletion(messages_data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  messages.push(completion.data.choices[0].message);
  res.status(200).json({ result: messages });
}
