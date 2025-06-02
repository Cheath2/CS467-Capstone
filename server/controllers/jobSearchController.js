// server/controllers/jobSearchController.js

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const fetchJobsFromAI = async (req, res) => {
  console.log('==== /api/job-search CALLED ====');
  console.log('Request body:', req.body);
  console.log(
    'OPENAI_API_KEY prefix:', 
    process.env.OPENAI_API_KEY?.slice(0, 10) + '…'
  );

  const { role, experience, location, salary, jobType } = req.body;

  const prompt = `You are an expert job matching assistant. Return exactly 5 real job listings in JSON format, based on the following preferences:
Role: ${role}
Experience Level: ${experience}
Location: ${location}
Salary Expectation: ${salary}
Job Type: ${jobType}

Return only a JSON array of 5 jobs. Each job should have these fields:
- title (string)
- company (string)
- location (string)
- summary (string)

No explanation—just JSON.

Example:
[
  {
    "title": "Software Engineer",
    "company": "TechCorp",
    "location": "San Francisco, CA",
    "summary": "Work on full-stack web applications in a fast-paced environment."
  },
  ...
]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    // Log whatever OpenAI sends
    const raw = completion.choices[0].message.content;
    console.log('🧠 OpenAI raw response:', raw);

    let jobs = [];
    try {
      jobs = JSON.parse(raw);
      if (!Array.isArray(jobs) || jobs.length === 0) {
        console.warn('⚠️ Parsed jobs are empty or invalid:', jobs);
        // Return the raw text too so you can see it on the frontend
        return res.status(200).json({
          jobs: [],
          raw,
          warning: 'Parsed jobs were empty or not an array',
        });
      }
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError.message);
      // Return the raw text and parse error so you can see what’s wrong
      return res.status(200).json({
        jobs: [],
        raw,
        parseError: parseError.message,
      });
    }

    // If parse succeeded, send both parsed jobs and raw text
    res.status(200).json({ jobs, raw });
  } catch (error) {
    console.error('❌ OpenAI API error:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch jobs from OpenAI',
      details: error.message,
    });
  }
};

module.exports = { fetchJobsFromAI };
