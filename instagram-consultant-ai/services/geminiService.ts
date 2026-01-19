
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, AnalysisResponse, InterviewQuestion, InterviewAnswer } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. 入力内容に基づいた深掘り質問を生成する
export const generateQuestions = async (input: UserInput): Promise<InterviewQuestion[]> => {
  const prompt = `
    あなたはInstagram運用コンサルタントです。
    ユーザーから送られてきた以下の初期情報を見て、より深く、パーソナルな分析をするために「これだけは確認しておきたい」という鋭い質問を3つ作成してください。
    
    【初期情報】
    ジャンル: ${input.category}
    ターゲット: ${input.targetAudience}
    悩み: ${input.mainIssue}
    数値: ${input.currentStats}

    【質問の指針】
    - 「毎日投稿が目的になっていませんか？」といった、本質を突く質問。
    - ユーザーが「あ、そこを意識できてなかった」と気づくような質問。
    - 具体的で答えやすいもの。
  `;

  // Upgraded to gemini-3-pro-preview for complex reasoning task
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            context: { type: Type.STRING }
          },
          required: ["id", "question", "context"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

// 2. 質問の回答を含めて最終分析を行う
export const analyzeWithInterview = async (input: UserInput, answers: InterviewAnswer[]): Promise<AnalysisResponse> => {
  const interviewContent = answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n");
  
  const prompt = `
    あなたは超一流のInstagram運用コンサルタントです。
    初期データと、その後のヒアリング回答を元に、ユーザーが「自分のことを分かってくれている」と確信する深い分析をしてください。

    【基本データ】
    ジャンル: ${input.category} / ターゲット: ${input.targetAudience} / 悩み: ${input.mainIssue}

    【ヒアリングでの対話】
    ${interviewContent}

    【要件】
    1. 「診断」: アカウントの状態を象徴する鋭いコピー。
    2. 「理由」: 表面的な数字ではなく、対話から見えた「マインドのズレ」や「行動の癖」を指摘。
    3. 「心理背景」: なぜユーザーがその非効率な行動をとってしまうのか。
    4. 「改善策」: 明日からすぐ変えられる具体策。
    5. 「コンサルタントからの要望・今後の問いかけ」: 今回の分析を踏まえ、あなたがユーザーに対して「さらにもっと深く聞いてみたいこと」や「次に会うまでに考えておいてほしい宿題」を2〜3点。
  `;

  // Upgraded to gemini-3-pro-preview for complex reasoning task
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diagnosis: { type: Type.STRING },
          reasons: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                psychology: { type: Type.STRING }
              },
              required: ["title", "description", "psychology"]
            }
          },
          solutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                forReason: { type: Type.STRING },
                action: { type: Type.STRING },
                merit: { type: Type.STRING }
              },
              required: ["forReason", "action", "merit"]
            }
          },
          tomorrowTasks: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          onePointAdvice: { type: Type.STRING },
          consultantRequests: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "今後さらに深掘りしたい点や、ユーザーへの宿題"
          }
        },
        required: ["diagnosis", "reasons", "solutions", "tomorrowTasks", "onePointAdvice", "consultantRequests"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
