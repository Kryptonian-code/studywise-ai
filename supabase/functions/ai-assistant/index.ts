import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, ...params } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "refine-topic": {
        systemPrompt = `You are a research methodology expert specializing in helping African graduate students refine research topics. Return a JSON object with: improved_title, objectives (array of 3-5), methodology_direction, research_questions (array of 3-4), rationale (brief explanation of improvements).`;
        userPrompt = `Refine this research topic for a ${params.studyLevel || "Master's"} student in ${params.field || "their field"}:\n\nRough topic: ${params.topic}\n${params.context ? `Context: ${params.context}` : ""}\n\nReturn valid JSON only.`;
        break;
      }
      case "profile-strength": {
        systemPrompt = `You are an admissions consultant specializing in helping students with non-traditional or weaker profiles present themselves professionally. You understand the Ghanaian and African educational context. Return a JSON object with: framing_suggestions (array of objects with {area, suggestion, example_phrase}), overall_strategy, strengths_to_highlight (array), narrative_approach.`;
        const challenges: string[] = [];
        if (params.lowGpa) challenges.push(`Low GPA: ${params.gpaDetails || "below average"}`);
        if (params.studyGap) challenges.push(`Study gap: ${params.gapDetails || "gap in academic timeline"}`);
        if (params.careerChange) challenges.push(`Career change: ${params.changeDetails || "switching fields"}`);
        if (params.limitedResearch) challenges.push("Limited research experience");
        userPrompt = `Help this student professionally frame their profile challenges:\n\nChallenges:\n${challenges.join("\n")}\n\nBackground: ${params.background || "Not provided"}\nTarget programme: ${params.programme || "Not specified"}\n\nReturn valid JSON only.`;
        break;
      }
      case "section-regenerate": {
        systemPrompt = `You are an expert academic document writer. Regenerate ONLY the specified section of a ${params.docType || "document"}. Match the tone and style. Write in ${params.tone || "Standard Formal"} tone. Output the section content only — no headers or labels.`;
        userPrompt = `Regenerate the "${params.sectionName}" section.\n\nFull document context:\n${params.fullDocument || ""}\n\nProgramme: ${params.programme || ""}\nUniversity: ${params.university || ""}\n\nSpecific instructions: ${params.instructions || "Improve quality, specificity, and impact."}`;
        break;
      }
      case "inline-hints": {
        systemPrompt = `You are a writing coach. Analyze the given text and return a JSON array of improvement hints. Each hint: {line_context (short quote from text), hint_type (one of: "measurable_achievement", "career_connection", "specificity", "generic_phrase", "impact", "flow", "evidence"), suggestion (specific actionable improvement), priority ("high"|"medium"|"low")}.  Return 3-8 hints. Return valid JSON array only.`;
        userPrompt = `Analyze this ${params.docType || "document"} section and provide inline writing hints:\n\n${params.text}`;
        break;
      }
      case "questionnaire": {
        systemPrompt = `You are an admissions questionnaire designer. Generate smart, contextual questions that will help produce a high-quality ${params.docType || "Statement of Purpose"}. Return a JSON array of question objects: {id, question, placeholder, type ("text"|"textarea"|"select"), options (array, only for select), required (boolean), category}. Generate 8-12 questions. Return valid JSON array only.`;
        userPrompt = `Generate adaptive questions for:\nDocument: ${params.docType}\nStudy level: ${params.studyLevel || "Master's"}\nProgramme category: ${params.programmeCategory || "General"}\nFunding: ${params.funding || "Self-funded"}\nCountry: ${params.country || "Not specified"}`;
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

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
        stream: action === "section-regenerate",
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("AI error:", status, t);
      return new Response(JSON.stringify({ error: "AI request failed" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "section-regenerate") {
      return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Try to parse JSON from the response
    let parsed;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : content);
    } catch {
      parsed = content;
    }

    return new Response(JSON.stringify({ result: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
