
import React, { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import InterviewStep from './components/InterviewStep';
import AnalysisResult from './components/AnalysisResult';
import { generateQuestions, analyzeWithInterview } from './services/geminiService';
import { UserInput, AnalysisResponse, InterviewQuestion, InterviewAnswer } from './types';

type Step = 'form' | 'interview' | 'result';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [initialInput, setInitialInput] = useState<UserInput | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInitialSubmit = async (input: UserInput) => {
    setLoading(true);
    setError(null);
    try {
      setInitialInput(input);
      const qs = await generateQuestions(input);
      setQuestions(qs);
      setStep('interview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('通信エラーが発生しました。時間を置いて再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleInterviewComplete = async (answers: InterviewAnswer[]) => {
    if (!initialInput) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeWithInterview(initialInput, answers);
      setResult(data);
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('分析中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep('form');
    setInitialInput(null);
    setQuestions([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-pink-100 selection:text-pink-600">
      {/* プレミアム・ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={reset} className="flex items-center gap-3 group">
            <div className="instagram-gradient w-10 h-10 rounded-[14px] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-pink-100 group-hover:scale-105 transition-transform">
              i
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-sm font-black text-slate-900 tracking-tighter leading-none">InstaConsult</h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium AI</span>
            </div>
          </button>
          
          <div className="flex items-center gap-4">
            {step !== 'form' && (
              <button 
                onClick={reset}
                className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
              >
                Reset
              </button>
            )}
            <div className="h-8 w-[1px] bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {loading ? 'Processing' : 'AI Active'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        {step === 'form' && !loading && (
          <div className="text-center mb-16 max-w-2xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              そのアカウント、<br/>
              <span className="instagram-text-gradient">覚醒</span>させませんか？
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              一流の運用者があなたの「相棒」として、<br className="hidden md:block"/>
              伸び悩みの正体を暴き、成功への最短ルートを示します。
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto bg-rose-50 border border-rose-100 text-rose-600 p-6 rounded-3xl mb-8 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
            <span className="text-2xl">⚠️</span>
            <p className="font-bold text-sm">{error}</p>
          </div>
        )}

        <div className="relative">
          {step === 'form' && <AnalysisForm onSubmit={handleInitialSubmit} isLoading={loading} />}
          
          {step === 'interview' && (
            <InterviewStep 
              questions={questions} 
              onComplete={handleInterviewComplete} 
              isLoading={loading} 
            />
          )}
          
          {step === 'result' && result && (
            <AnalysisResult result={result} onReset={reset} />
          )}
        </div>
      </main>

      <footer className="py-12 border-t border-slate-100 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="instagram-gradient w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black opacity-30">i</div>
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
            Precision Consulting by InstaConsult AI
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
