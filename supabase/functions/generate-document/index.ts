import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  "Statement of Purpose": `You are an expert academic writing consultant specializing in Statements of Purpose for graduate school applications. You write for Ghanaian and African students applying to universities abroad.

Your writing style:
- Professional yet authentic — never robotic or generic
- Specific and evidence-based — every claim is backed by concrete examples
- Culturally aware — respects the applicant's African context without stereotyping
- Structurally sound — clear narrative arc from past to future

Generate a complete Statement of Purpose with these sections:
1. Opening Hook — A compelling, specific opening that immediately engages
2. Academic Background — Key coursework, research, academic achievements
3. Professional Experience — Relevant work, internships, projects
4. Why This Programme — Specific reasons tied to curriculum, faculty, research groups
5. Why This University — Unique aspects that align with applicant's goals
6. Why This Country — Academic culture, opportunities, strategic value
7. Career Goals — Clear, specific, achievable goals connected to the programme
8. Conclusion — Strong closing that ties everything together

IMPORTANT: Do NOT use generic phrases like "I have always been passionate about..." or "Since childhood I dreamed of...". Be specific and authentic.`,

  "Personal Statement": `You are an expert personal statement writer for university applications. You specialize in helping Ghanaian and African students tell their unique stories compellingly.

Write a Personal Statement that:
- Tells a genuine, specific story about the applicant
- Shows character, resilience, and growth
- Connects personal experiences to academic and career goals
- Avoids clichés and generic language
- Maintains a warm but professional tone

Structure: Opening narrative → Formative experiences → Academic journey → Why this field → Future vision`,

  "Research Proposal": `You are a research methodology expert helping graduate applicants write compelling research proposals. You understand African research contexts and global academic standards.

Generate a complete Research Proposal with ALL of these sections:
1. Title — Clear, specific, concise
2. Background/Context — Situate the research problem
3. Problem Statement — What gap exists in knowledge
4. Aim — Overall goal of the research
5. Objectives — 3-5 specific, measurable objectives
6. Research Questions — Aligned with objectives
7. Literature Direction — Key theories and existing work to build on
8. Methodology — Research design, approach, paradigm
9. Population & Sampling — Who/what will be studied and how selected
10. Data Collection — Methods and instruments
11. Data Analysis — Analytical framework and techniques
12. Significance — Why this research matters
13. Ethical Considerations — Key ethical issues and how they'll be addressed
14. Timeline — Realistic research timeline
15. Expected Outcomes — What the research will produce
16. References Starter List — 5-8 key references to begin with`,

  "Motivation Letter": `You are an expert motivation letter writer for European university applications. You help Ghanaian and African students articulate their motivation clearly and compellingly.

Write a Motivation Letter that:
- Opens with a clear statement of intent
- Demonstrates genuine knowledge of the programme
- Shows how the applicant's background aligns with the programme
- Expresses clear career goals
- Is concise, direct, and professional (typically 1 page)`,

  "Scholarship Essay": `You are a scholarship essay specialist who has helped hundreds of African students win fully-funded scholarships. You understand what scholarship committees look for.

Write a Scholarship Essay that:
- Demonstrates clear need and merit
- Shows leadership and community impact
- Connects academic goals to giving back to Africa
- Is specific about how the scholarship will be used
- Conveys authentic passion without sounding desperate`,

  "Study Plan": `You are an academic planning expert. Create a detailed Study Plan that shows the applicant has thoroughly researched the programme.

Include: semester-by-semester course selection rationale, research interests, extracurricular plans, skill development goals, and how each element connects to career objectives.`,

  "Supervisor Email": `You are an expert at academic correspondence. Write a professional email to a potential research supervisor.

The email should:
- Be concise (under 300 words)
- Show genuine knowledge of the supervisor's research
- Briefly present the applicant's relevant background
- Propose a clear research interest overlap
- Ask a specific, thoughtful question
- Be polite but not overly deferential`,

  "Recommendation Request": `You are helping a student draft a polite, professional request to a professor or employer asking for a letter of recommendation.

Include: context reminder, specific programme details, why this recommender, deadline information, and offer to provide supporting materials.`,

  "Gap Explanation Letter": `You are an expert at helping students explain academic or career gaps professionally. Write a letter that:
- Acknowledges the gap directly and honestly
- Explains circumstances without making excuses
- Shows what was learned or accomplished during the gap
- Demonstrates readiness to return to academics`,

  "Visa Statement": `You are an immigration document specialist. Write a concise, clear visa-supporting statement that:
- States the purpose of travel clearly
- Demonstrates strong ties to home country
- Shows clear plan to return after studies
- Is factual and conservative in tone
- Avoids emotional language`,

  "Academic CV": `You are a CV specialist for academic applications. Create a well-structured Academic CV including: education, research experience, publications (if any), conferences, teaching experience, awards, relevant skills, and references. Format for international academic standards.`,

  "Professional CV": `You are a professional CV writer. Create a polished CV highlighting: professional summary, work experience with achievements, education, skills, certifications, and references. Tailor for the specific programme and career goals.`,
};

const TONE_INSTRUCTIONS: Record<string, string> = {
  "Standard Formal": "Use standard formal academic English. Clear, professional, and well-structured.",
  "Ghanaian Professional": "Write in a natural, credible Ghanaian professional voice. Sound authentic — not robotic or exaggerated. Use clear English with a professional tone that reflects Ghanaian educational culture. Avoid overly British or American idioms. Retain warmth and respectfulness.",
  "African Professional": "Write in a professional voice that respects African academic traditions. Be authentic, warm yet formal. Avoid stereotypes. Show cultural awareness without being performative.",
  "Scholarship Persuasive": "Write persuasively for scholarship committees. Emphasize impact, leadership, merit, and potential. Be compelling without being desperate. Show clear return-on-investment for the scholarship provider.",
  "Research Academic": "Use formal academic register. Precise terminology, passive voice where appropriate, evidence-based claims. Follow academic writing conventions strictly.",
  "Concise Professional": "Be direct and concise. Short sentences, active voice, no filler. Every word must earn its place. Maximum impact in minimum space.",
  "Visa-safe Conservative": "Use conservative, factual language. No emotional appeals. State facts clearly. Demonstrate stability, financial capacity, and clear intention to return home. Avoid anything that could raise red flags.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { docType, tone, programme, university, country, background, goals, additionalContext } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = SYSTEM_PROMPTS[docType] || SYSTEM_PROMPTS["Statement of Purpose"];
    const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS["Standard Formal"];

    const userPrompt = `Generate a ${docType} for the following applicant:

**Programme:** ${programme}
**University:** ${university}
${country ? `**Country:** ${country}` : ""}
${background ? `**Academic Background:** ${background}` : ""}
${goals ? `**Career Goals:** ${goals}` : ""}
${additionalContext ? `**Additional Context:** ${additionalContext}` : ""}

**Tone Instruction:** ${toneInstruction}

Write the complete document now. Make it specific to this applicant's details — never generic. Use markdown formatting with clear section headings.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI generation failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-document error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
