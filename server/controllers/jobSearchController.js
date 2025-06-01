const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const fetchJobsFromAI = async (req, res) => {
  const { role, experience, location, salary, jobType } = req.body;

  const prompt = `You are an expert job matching assistant. Return exactly 5 real job listings in JSON format, based on the following preferences:
  Role: ${role}
  Experience Level: ${experience}
  Location: ${location}
  Salary Expectation: ${salary}
  Job Type: ${jobType}

  Return only a JSON array of 5 jobs. Each job should have the following fields:
  - title (string)
  - company (string)
  - location (string)
  - summary (string)

  Example:

  [
    {
      "title": "Software Engineer",
      "company": "TechCorp",
      "location": "San Francisco, CA",
      "summary": "Work on full-stack web applications in a fast-paced environment."
    },
    ...
  ]`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    let jobs = [];

        // ✅ DEBUG LOGS
    console.log('🔍 AI Prompt Sent:', prompt);
    console.log('🧠 AI Raw Output:', completion.choices[0].message.content);

  try {
    jobs = JSON.parse(completion.choices[0].message.content);
  } catch (parseError) {
    console.error('Failed to parse JSON:', parseError);
    return res.status(500).json({ error: 'Invalid AI response format' });
  }

    res.json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs from OpenAI' });
  }
};

module.exports = { fetchJobsFromAI };