export interface YoutubeData {
  id: string;
  date: string;
  channelTitle: string;
  channelUrl?: string;
  videoTitle: string;
  videoUrl: string;
  videoTranscript: string;
  videoSummary?: string;
  peopleDatabase: string;
  toolDatabase: string;
  caseStudies: string;
  useCases: string;
  summary: string;
  implications: string;
  articleIdeas: string;
  opportunities: string;
  risks: string;
}

// Mock data for development
const mockData: YoutubeData[] = [
  {
    id: "rec2hJNygq8yJk2nN",
    date: "26 Feb 2025",
    channelTitle: "Super Data Science: ML & AI Podcast with Jon Krohn",
    videoTitle: "865: How to Grow (and Sell) a Data Science Consultancy",
    videoUrl: "https://www.youtube.com/watch?v=7GGbXCmompU",
    videoTranscript:
      "00:00 - from the startup that you raised capital for right out of Case Western to founding Pandata to the acquisition by further what were your biggest Lessons Learned you're trained and taught that 50:21 - another round of the super data science podcast with you very soon 00:00 - from the startup that you raised capital for right out of Case Western to founding Pandata to the acquisition by further what were your biggest Lessons Learned you're trained and taught that 50:21 - another round of the super data science podcast with you very soon 00:00 - from the startup that you raised capital for right out of Case Western to founding Pandata to the acquisition by further what were your biggest Lessons Learned you're trained and taught that 50:21 - another round of the super data science podcast with you very soon 00:00 - from the startup that you raised capital for right out of Case Western to founding Pandata to the acquisition by further what were your biggest Lessons Learned you're trained and taught that 50:21 - another round of the super data science podcast with you very soon 00:00 - from the startup that you raised capital for right out of Case Western to founding Pandata to the acquisition by further what were your biggest Lessons Learned you're trained and taught that 50:21 - another round of the super data science podcast with you very soon 00:00 - from the startup that you raised capital for right out of Case Western to founding Pandata to the acquisition by further what were your biggest Lessons Learned you're trained and taught that 50:21 - another round of the super data science podcast with you very soon",
    peopleDatabase:
      "Name: Cal Aldobai; Mentions: 7; Mentioned By: John Doe; Description: Founder of Pandata, experienced in data science consultancy, and head of AI and data science at Further.",
    toolDatabase:
      "Tool Name: Pandas; Description: An open-source data manipulation and analysis library for Python; Mentions: 2; Mentioned By: Cal Aldobai; Comments: Essential tool for data scientists for handling data frames.",
    caseStudies:
      "Title: Healthtech AI Implementation; Description: Healthtech company improved their reach by using an AI model that identified patients for government assistance. Initially, the adoption was low due to lack of trust in the model; Tools Used: Ensemble machine learning model; Results: After addressing AI literacy, the reach improved by 18%.",
    useCases:
      "Task: Identifying patients for government assistance; Enabled By: AI model; New Capability: Can identify patients who didn't previously qualify, increasing efficiency and accessibility.",
    summary:
      "Idea: Importance of AI literacy in project success; Timestamp: 28:01; Impact: Improved model adoption from 2% to 18% by educating users on how the model works.",
    implications:
      "Idea: Need for strong client engagement in data science projects; Takeaway: Clients must understand project methodologies to ensure successful outcomes.",
    articleIdeas:
      "Topic: The Importance of AI Literacy in Healthcare; Description: Discussing how improving AI understanding can enhance project outcomes in health-related AI implementations.",
    opportunities:
      "Opportunity: Focus on regulated industries for data science consultancy; Audience: Aspiring data science consultants and entrepreneurs.",
    risks:
      "Risk: Lack of trust in AI models leading to project failure; Audience: Data scientists and business leaders.",
  },

  {
    id: "rec1hJNygq8yJk2nN",
    date: "31 Jan 2025",
    channelTitle: "Skill Leap AI",
    videoTitle: "DeepSeek R1 vs ChatGPT o1",
    videoUrl: "https://www.youtube.com/watch?v=kQZzYMHre0U",
    videoTranscript:
      "00:00 - I compare deep seek R1 reasoning model versus chat GPT o1. Thank you for watching!",
    peopleDatabase:
      "Name: Deep Seek; Mentions: 10; Mentioned By: Speaker; Description: An open-source large language model known for reasoning capabilities in problem-solving.",
    toolDatabase:
      "Tool Name: ChatGPT; Description: A chatbot that uses large language models for generating text-based responses; Mentions: 15; Mentioned By: Speaker; Comments: Known for its efficiency in a variety of tasks but has faced issues in reasoning tasks.",
    caseStudies:
      "Title: Comparing Reasoning Models; Description: A comparison of the reasoning abilities of Deep Seek R1 and ChatGPT O1 demonstrating different outputs and processing times; Tools Used: Deep Seek, ChatGPT; Results: Deep Seek provided more detailed reasoning steps while ChatGPT produced faster responses.",
    useCases:
      "Task: Solving complex logic problems; Enabled By: Deep Seek, ChatGPT; New Capability: Accelerated reasoning through logical problem-solving.",
    summary:
      "Idea: AI models optimizing reasoning tasks; Timestamp: 00:00; Impact: Offers insight into how models can aid in logic-based problem-solving processes.",
    implications:
      "Idea: Different use cases for open-source AI models; Takeaway: Utilizing open-source models could enhance privacy and control over data.",
    articleIdeas:
      "Topic: The Future of AI in Problem Solving; Description: Investigating how advanced reasoning models like Deep Seek can transform tasks requiring complex logical analysis.",
    opportunities:
      "Opportunity: Local installation of open-source AI for privacy; Audience: Businesses needing secure data analysis solutions.",
    risks:
      "Risk: Potential misinterpretation of data; Audience: Organizations relying heavily on AI for critical decision-making.",
  },
  // Add more mock data for testing
  {
    id: "rec2hJNygq8yJk2nM",
    date: "15 Feb 2025",
    channelTitle: "AI Insights",
    videoTitle: "The Future of Generative AI in 2025",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    videoTranscript:
      "00:00 - Today we're exploring the future of generative AI and what to expect in 2025. Let's dive in!",
    peopleDatabase:
      "Name: Dr. Jane Smith; Mentions: 5; Mentioned By: Host; Description: AI researcher specializing in generative models and their applications.",
    toolDatabase:
      "Tool Name: Midjourney; Description: An AI image generation tool; Mentions: 8; Mentioned By: Host; Comments: Highlighted for its improvements in artistic rendering and creative applications.",
    caseStudies:
      "Title: AI in Creative Industries; Description: Examination of how generative AI is transforming design, art, and content creation; Tools Used: Midjourney, DALL-E; Results: Significant reduction in production time while maintaining quality.",
    useCases:
      "Task: Automated content creation; Enabled By: Generative AI models; New Capability: Rapid iteration of creative concepts without manual intervention.",
    summary:
      "Idea: Generative AI becoming mainstream in creative workflows; Timestamp: 00:15; Impact: Democratization of creative tools and processes.",
    implications:
      "Idea: Shifting role of human creators; Takeaway: AI will augment rather than replace human creativity, changing workflow dynamics.",
    articleIdeas:
      "Topic: The Collaboration Between Human Artists and AI; Description: Exploring the symbiotic relationship developing between creative professionals and AI tools.",
    opportunities:
      "Opportunity: New business models around AI-assisted creation; Audience: Creative agencies and independent artists.",
    risks:
      "Risk: Copyright and ownership questions; Audience: Content creators and legal professionals.",
  },
  {
    id: "rec3hJNygq8yJk2nO",
    date: "3 Mar 2025",
    channelTitle: "Tech Frontiers",
    videoTitle: "Quantum Computing: Breaking the Encryption Barrier",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    videoTranscript:
      "00:00 - Welcome to our deep dive on quantum computing and its implications for modern encryption standards.",
    peopleDatabase:
      "Name: Dr. Robert Chen; Mentions: 12; Mentioned By: Interviewer; Description: Leading quantum computing researcher at Quantum Labs with focus on cryptography applications.",
    toolDatabase:
      "Tool Name: IBM Quantum; Description: Quantum computing platform for researchers and developers; Mentions: 7; Mentioned By: Expert; Comments: Referenced as the current leading platform for practical quantum computing experiments.",
    caseStudies:
      "Title: Post-Quantum Cryptography Implementation; Description: Analysis of organizations preparing for quantum threats to encryption; Tools Used: IBM Quantum, Google Sycamore; Results: Early adopters implementing quantum-resistant algorithms showing promising security metrics.",
    useCases:
      "Task: Secure communications in a post-quantum world; Enabled By: Quantum-resistant algorithms; New Capability: Maintaining data security against quantum attacks.",
    summary:
      "Idea: Urgency in updating encryption standards; Timestamp: 05:30; Impact: Critical infrastructure vulnerability if action not taken soon.",
    implications:
      "Idea: Timeline acceleration for quantum threats; Takeaway: The window for preparation may be shorter than previously estimated.",
    articleIdeas:
      "Topic: Preparing Your Organization for Quantum Security Threats; Description: Practical steps organizations should take now to prepare for quantum computing's impact on security.",
    opportunities:
      "Opportunity: Early adoption of quantum-resistant solutions; Audience: Financial institutions and government agencies.",
    risks:
      "Risk: Delayed response to quantum threats; Audience: Organizations with long-term data protection needs.",
  },
];

// Function to fetch all YouTube data
export async function fetchYoutubeData(): Promise<YoutubeData[]> {
  // In a real application, you would fetch this from Airtable
  // For now, we'll return the mock data
  return mockData;
}

// Function to fetch a specific YouTube data entry by ID
export async function fetchYoutubeDataById(
  id: string
): Promise<YoutubeData | undefined> {
  // In a real application, you would fetch this from Airtable
  // For now, we'll find it in the mock data
  return mockData.find((item) => item.id === id);
}
