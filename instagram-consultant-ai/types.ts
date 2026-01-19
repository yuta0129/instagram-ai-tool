
export interface UserInput {
  category: string;
  targetAudience: string;
  purpose: string;
  followers: string;
  postFrequency: string;
  contentType: string[];
  mainIssue: string;
  currentStats: string;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  context: string; // なぜその質問をするのかという意図
}

export interface InterviewAnswer {
  questionId: number;
  question: string;
  answer: string;
}

export interface AnalysisResponse {
  diagnosis: string;
  reasons: {
    title: string;
    description: string;
    psychology: string;
  }[];
  solutions: {
    forReason: string;
    action: string;
    merit: string;
  }[];
  tomorrowTasks: string[];
  onePointAdvice: string;
  consultantRequests: string[]; // AIからユーザーへの「もっと聞きたいこと」や「宿題」
}
