
import React from 'react';
import { AnalysisResponse } from '../types';

interface Props {
  result: AnalysisResponse;
  onReset: () => void;
}

const AnalysisResult: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* 診断メインボード */}
      <div className="relative group">
        <div className="absolute -inset-1 instagram-gradient rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white rounded-[2.8rem] p-10 md:p-16 text-center shadow-xl border border-slate-50 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 instagram-gradient"></div>
          <div className="mb-6 inline-block">
            <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em]">Final Report</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight">
            あなたのアカウントは今、<br/>
            <span className="instagram-text-gradient block mt-3 text-4xl md:text-6xl">「{result.diagnosis}」</span>
          </h2>
          <p className="mt-8 text-slate-400 font-medium md:text-lg max-w-xl mx-auto">
            これが、対話から見えたあなたの真実です。<br className="hidden md:block"/>
            ここから、劇的な変化を始めましょう。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 左カラム: 理由と対策 */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-sm">✕</span>
              なぜ伸び悩んでいるのか？
            </h3>
            <div className="space-y-10">
              {result.reasons.map((reason, idx) => (
                <div key={idx} className="relative pl-10">
                  <span className="absolute left-0 top-0 text-slate-100 text-6xl font-black leading-none -z-10 select-none">{idx + 1}</span>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{reason.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{reason.description}</p>
                  <div className="bg-slate-50/80 p-5 rounded-2xl text-xs text-slate-500 leading-relaxed border border-slate-100">
                    <span className="font-extrabold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                      <span className="text-base">💭</span> 運用の裏にある心理
                    </span>
                    {reason.psychology}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm">✓</span>
              具体的アクションプラン
            </h3>
            <div className="grid gap-5">
              {result.solutions.map((sol, idx) => (
                <div key={idx} className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-white text-[10px] font-black text-slate-400 border border-slate-100 mb-3 uppercase">{sol.forReason}</span>
                  <p className="text-lg font-black text-slate-800 mb-2">{sol.action}</p>
                  <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 italic">
                    <span className="not-italic">✨ 効果:</span> {sol.merit}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 右カラム: 行動リストと宿題 */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity"></div>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10">
              <span className="text-2xl">🔥</span> 24時間以内にやること
            </h3>
            <ul className="space-y-5 relative z-10">
              {result.tomorrowTasks.map((task, idx) => (
                <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <p className="font-bold text-sm leading-snug">{task}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-indigo-50/50 rounded-[2.5rem] p-8 md:p-10 border border-indigo-100 border-dashed">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-black text-indigo-900 flex items-center gap-3">
                <span className="text-2xl">📝</span> AIからの宿題
              </h3>
            </div>
            <div className="space-y-6">
              {result.consultantRequests.map((req, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-indigo-200 text-2xl font-black italic">?</span>
                  <p className="text-slate-700 text-sm font-bold leading-relaxed">{req}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-indigo-100">
              <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">Message for you</p>
              <p className="text-indigo-800 font-black text-lg italic leading-relaxed">
                「{result.onePointAdvice}」
              </p>
            </div>
          </section>

          <div className="pt-4">
            <button
              onClick={onReset}
              className="w-full py-4 rounded-2xl border-2 border-slate-200 text-slate-400 font-black text-sm hover:bg-slate-100 hover:text-slate-600 transition-all duration-300"
            >
              最初からやり直す
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
