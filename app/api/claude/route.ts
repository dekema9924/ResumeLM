import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { extractedText, company, jobTitle, jobDescription } = await req.json();

        console.log(extractedText, company, jobTitle, jobDescription)

        if (!extractedText) {
            return NextResponse.json({ error: "No text content provided." }, { status: 400 });
        }

        const systemPrompt = `You are an Applicant Tracking System (ATS) filter and expert resume analyzer.
When given a resume text and a target job (company, job title, job description), you must:
1. Identify sections a bot would struggle to parse (tables, columns, headers/footers, graphics, icons)
2. Flag formatting that causes ATS failures (text boxes, non-standard fonts, special characters, images with text)
3. Score the resume across key dimensions
4. Evaluate how well the resume matches the specific job provided
5. Return ONLY valid JSON — no preamble, no markdown, no backticks.

Return this exact shape:
{
  "overall": { "score": number, "issues": number },
  "items": [
    { "label": "Tone & Style", "badge": "Good Start|Strong|Needs work", "score": number },
    { "label": "Content", "badge": "Good Start|Strong|Needs work", "score": number },
    { "label": "Structure", "badge": "Good Start|Strong|Needs work", "score": number },
    { "label": "Skills", "badge": "Good Start|Strong|Needs work", "score": number }
  ],
  "ats_issues": [
    {
      "section": "string (e.g. Header, Skills, Work Experience)",
      "severity": "high|medium|low",
      "problem": "string describing what the ATS would struggle with",
      "fix": "string describing exactly what to change"
    }
  ],
  "job_fit": {
    "score": number,
    "summary": "string — 2-3 sentence assessment of fit for this specific role",
    "missing_keywords": ["string", "string"],
    "matching_strengths": ["string", "string"]
  },
  "feedback": ["string tip 1", "string tip 2"]
}`;

        const userPrompt = `Act as an applicant tracking system filter and recruiter. Scan this resume content:

${extractedText}

This resume is being evaluated for the following role:
Company: ${company || "Not specified"}
Job Title: ${jobTitle || "Not specified"}
Job Description: ${jobDescription || "Not specified"}

Tell me which sections a bot would struggle to read, which formatting might cause issues, what I need to fix for 100% ATS compatibility, and how well this resume fits the specific role above.`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY || ""}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                max_tokens: 2000,
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: "Groq API Error", details: errorText }, { status: response.status });
        }

        const aiData = await response.json();
        const aiMessage = aiData.choices[0].message.content;
        const parsedJsonResult = JSON.parse(aiMessage);

        return NextResponse.json(parsedJsonResult, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};