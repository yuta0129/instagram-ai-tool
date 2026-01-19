
import React, { useState } from 'react';
import { InterviewQuestion, InterviewAnswer } from '../types';

interface Props {
  questions: InterviewQuestion[];
  onComplete: (answers: InterviewAnswer[]) => void;
  isLoading: boolean;
}

const InterviewStep: React.FC<Props> = ({ questions, onComplete, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [currentValue, setCurrentValue] = useState('');

  const handleNext = () => {
    if (!currentValue.trim()) return;

    const newAnswer: InterviewAnswer = {
      questionId: questions[currentIndex].id,
      question: questions[currentIndex].question,
      answer: currentValue
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setCurrentValue('');

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-50 step-enter">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
              {currentIndex + 1}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Consulting Interview</p>
              <p className="text-xs font-bold text-slate-500">Step {currentIndex + 1} of {questions.length}</p>
            </div>
          </div>
          <span className="text-2xl font-black text-slate-100">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
          <div 
            className="h-full instagram-gradient transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[280px] flex flex-col justify-center mb-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-500 text-[10px] font-black mb-4">
            <span className="text-sm">🎯</span> Intent: {currentQ.context}
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
            {currentQ.question}
          </h3>
        </div>

        <div className="relative group">
          <textarea
            autoFocus
            placeholder="あなたの本音を聞かせてください..."
            className="w-full h-40 p-6 rounded-[2rem] border border-slate-100 focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all duration-500 outline-none bg-slate-50/50 text-lg md:text-xl font-medium text-slate-700 resize-none"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          <div className="absolute bottom-4 right-6 text-[10px] font-black text-slate-300 uppercase pointer-events-none">
            Your Insight Matters
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleNext}
          disabled={isLoading || !currentValue.trim()}
          className={`w-full py-5 rounded-2xl font-black text-white shadow-2xl transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 ${
            isLoading || !currentValue.trim() ? 'bg-slate-200 cursor-not-allowed text-slate-400' : 'bg-slate-900 hover:shadow-slate-200 hover:-translate-y-1'
          }`}
        >
          {isLoading ? (
            '分析レポートを作成中...'
          ) : (
            <>
              <span>{currentIndex === questions.length - 1 ? '最終分析を確認する' : '次の質問に進む'}</span>
              <span className="text-xl">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InterviewStep;
