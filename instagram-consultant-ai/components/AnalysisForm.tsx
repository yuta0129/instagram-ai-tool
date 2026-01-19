
import React, { useState } from 'react';
import { UserInput } from '../types';

interface Props {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    category: '',
    targetAudience: '',
    purpose: '',
    followers: '',
    postFrequency: '',
    contentType: [],
    mainIssue: '',
    currentStats: '',
  });

  const handleCheckboxChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      contentType: prev.contentType.includes(type)
        ? prev.contentType.filter(t => t !== type)
        : [...prev.contentType, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-300 outline-none bg-slate-50/50 text-slate-700 font-medium placeholder:text-slate-300";
  const labelClasses = "block text-sm font-extrabold text-slate-600 mb-2.5 ml-1 flex items-center";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 step-enter">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
          Professional Intake
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
          あなたのアカウントを<br className="md:hidden"/>徹底解剖します
        </h2>
        <p className="text-slate-400 text-sm mt-3 font-medium px-4">
          データだけでは見えない「あなたの想い」を聞かせてください
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>発信ジャンル</label>
          <input
            required
            placeholder="例: 週末キャンプ"
            className={inputClasses}
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClasses}>届けたい相手</label>
          <input
            required
            placeholder="例: 初心者ソロキャンパー"
            className={inputClasses}
            value={formData.targetAudience}
            onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>フォロワー数</label>
          <div className="relative">
            <input
              required
              type="number"
              placeholder="0"
              className={`${inputClasses} pr-12`}
              value={formData.followers}
              onChange={e => setFormData({ ...formData, followers: e.target.value })}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs uppercase">People</span>
          </div>
        </div>
        <div>
          <label className={labelClasses}>投稿のペース</label>
          <select
            className={inputClasses}
            value={formData.postFrequency}
            onChange={e => setFormData({ ...formData, postFrequency: e.target.value })}
          >
            <option value="">選択してください</option>
            <option value="毎日">毎日</option>
            <option value="週3-4回">週3-4回</option>
            <option value="週1-2回">週1-2回</option>
            <option value="不定期">不定期</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>メインの武器（投稿形式）</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['リール', 'フィード', 'ストーリーズ', 'ライブ'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleCheckboxChange(type)}
              className={`py-3 rounded-xl border text-xs font-black transition-all duration-300 ${
                formData.contentType.includes(type)
                  ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClasses}>今、一番苦しいこと</label>
        <textarea
          required
          placeholder="例: 投稿内容に悩みすぎて1歩も進めない、何が正解か分からない..."
          className={`${inputClasses} h-32 resize-none`}
          value={formData.mainIssue}
          onChange={e => setFormData({ ...formData, mainIssue: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-5 rounded-2xl font-black text-white shadow-2xl transition-all duration-500 transform active:scale-[0.97] flex items-center justify-center gap-3 ${
          isLoading ? 'bg-slate-300 cursor-not-allowed' : 'instagram-gradient hover:shadow-pink-200 hover:-translate-y-1'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AIが状況を把握しています...
          </>
        ) : (
          <>
            <span>ヒアリングを開始する</span>
            <span className="text-xl">→</span>
          </>
        )}
      </button>
    </form>
  );
};

export default AnalysisForm;
