// Template library for different document types by country/programme
export interface DocumentTemplate {
  id: string;
  name: string;
  country: string;
  docType: string;
  sections: { name: string; description: string; wordCount: string }[];
  tips: string[];
}

export const templates: DocumentTemplate[] = [
  {
    id: "uk-sop",
    name: "UK Statement of Purpose",
    country: "United Kingdom",
    docType: "Statement of Purpose",
    sections: [
      { name: "Opening Hook", description: "A specific, compelling reason for choosing this field", wordCount: "80–120" },
      { name: "Academic Background", description: "Relevant coursework, dissertation, academic achievements", wordCount: "150–200" },
      { name: "Professional Experience", description: "Work, internships, or projects relevant to the programme", wordCount: "120–180" },
      { name: "Why This Programme", description: "Specific modules, research groups, or faculty that attract you", wordCount: "150–200" },
      { name: "Why This University", description: "Unique features — labs, partnerships, location, reputation", wordCount: "100–150" },
      { name: "Career Goals", description: "Clear, achievable goals connected to the programme", wordCount: "100–150" },
      { name: "Conclusion", description: "Strong closing that ties your narrative together", wordCount: "60–80" },
    ],
    tips: [
      "UK SOPs are typically 500–1000 words",
      "Be specific about modules and faculty",
      "Avoid emotional language — UK admissions prefer evidence-based writing",
      "Don't repeat your CV — add context and reflection",
    ],
  },
  {
    id: "uk-research-proposal",
    name: "UK Research Proposal",
    country: "United Kingdom",
    docType: "Research Proposal",
    sections: [
      { name: "Title", description: "Clear, specific, under 15 words", wordCount: "10–15" },
      { name: "Introduction & Background", description: "Context, significance, and gap in literature", wordCount: "300–400" },
      { name: "Research Questions", description: "3–4 focused, answerable research questions", wordCount: "80–120" },
      { name: "Literature Review", description: "Key theories and existing work to build on", wordCount: "400–500" },
      { name: "Methodology", description: "Research design, data collection, analysis methods", wordCount: "400–500" },
      { name: "Timeline", description: "Realistic milestones over the PhD period", wordCount: "100–150" },
      { name: "Ethical Considerations", description: "Ethics approval, consent, data protection", wordCount: "100–150" },
      { name: "References", description: "10–15 key academic references in Harvard or APA style", wordCount: "N/A" },
    ],
    tips: [
      "UK proposals are typically 1500–3000 words",
      "Align your topic with the supervisor's research interests",
      "Show you understand the UK Research Excellence Framework (REF)",
      "Include a clear contribution to knowledge",
    ],
  },
  {
    id: "canada-ps",
    name: "Canada Personal Statement",
    country: "Canada",
    docType: "Personal Statement",
    sections: [
      { name: "Personal Narrative", description: "A story that reveals your character and motivation", wordCount: "150–200" },
      { name: "Academic Journey", description: "How your education shaped your interests", wordCount: "150–200" },
      { name: "Research & Experience", description: "Hands-on experience relevant to your field", wordCount: "150–200" },
      { name: "Why Canada", description: "Why Canadian education and this specific university", wordCount: "100–150" },
      { name: "Diversity & Contribution", description: "What unique perspective you bring", wordCount: "100–150" },
      { name: "Future Vision", description: "Career goals and how the programme enables them", wordCount: "100–120" },
    ],
    tips: [
      "Canadian universities value diversity and community contribution",
      "Be personal — this is your story, not just your CV",
      "Mention specific Canadian research strengths in your field",
      "Show awareness of Canadian academic culture",
    ],
  },
  {
    id: "germany-ml",
    name: "Germany Motivation Letter",
    country: "Germany",
    docType: "Motivation Letter",
    sections: [
      { name: "Opening", description: "Clear statement of intent — programme, university, semester", wordCount: "50–80" },
      { name: "Academic Qualification", description: "How your degree prepares you for this programme", wordCount: "150–200" },
      { name: "Relevant Experience", description: "Projects, work, or research that qualify you", wordCount: "120–150" },
      { name: "Motivation for Programme", description: "Specific reasons for choosing this programme", wordCount: "150–200" },
      { name: "Why Germany", description: "Academic culture, research landscape, industry connections", wordCount: "80–120" },
      { name: "Career Outlook", description: "Clear professional goals post-graduation", wordCount: "80–100" },
    ],
    tips: [
      "German motivation letters are typically 1 page (500–750 words)",
      "Be direct and factual — German academic culture values precision",
      "Mention DAAD, DFG, or specific German research institutes if relevant",
      "Address the letter formally if a contact person is given",
    ],
  },
  {
    id: "scholarship-essay",
    name: "Scholarship Essay (General)",
    country: "International",
    docType: "Scholarship Essay",
    sections: [
      { name: "Hook & Context", description: "Compelling opening that shows who you are", wordCount: "80–120" },
      { name: "Need & Merit", description: "Why you deserve and need this scholarship", wordCount: "150–200" },
      { name: "Leadership & Impact", description: "Examples of leadership and community contribution", wordCount: "150–200" },
      { name: "Academic Goals", description: "What you will study and why it matters", wordCount: "120–150" },
      { name: "Giving Back", description: "How you will use your education to benefit your community/country", wordCount: "120–150" },
      { name: "Closing", description: "Strong, memorable closing statement", wordCount: "50–80" },
    ],
    tips: [
      "Scholarship committees fund people, not just grades",
      "Show leadership through specific examples, not claims",
      "Connect your goals to broader societal impact",
      "Be genuine — avoid exaggeration",
    ],
  },
  {
    id: "daad-ml",
    name: "DAAD Scholarship Motivation Letter",
    country: "Germany",
    docType: "Motivation Letter",
    sections: [
      { name: "Programme Choice", description: "Why this specific DAAD programme", wordCount: "100–150" },
      { name: "Academic Preparation", description: "How your education qualifies you", wordCount: "150–200" },
      { name: "Professional Relevance", description: "Work experience relevant to your study goals", wordCount: "120–150" },
      { name: "Why Germany", description: "Academic and professional reasons for studying in Germany", wordCount: "100–150" },
      { name: "Development Impact", description: "How your studies will benefit your home country", wordCount: "150–200" },
      { name: "Post-Study Plans", description: "Concrete plans after returning home", wordCount: "80–120" },
    ],
    tips: [
      "DAAD strongly values development relevance — show how you'll contribute back home",
      "Mention specific German institutions or professors",
      "Keep it under 2 pages",
      "Demonstrate you've researched the German academic landscape",
    ],
  },
];
