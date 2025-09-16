import React, { useState } from 'react';

interface InputSectionProps {
  onStartAnalysis: (input: string) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onStartAnalysis, isAnalyzing }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isAnalyzing) {
      onStartAnalysis(input.trim());
    }
  };

  const placeholderTexts = [
    "总说忙，但朋友圈从不断更",
    "纪念日忘买礼物，游戏皮肤倒是买得勤",
    "分手后秒换头像，仿佛我们从未存在过",
    "说要给我未来，结果连现在都给不了",
    "吵架永远是我的错，道歉永远要我先开口",
    "对我冷淡，对别人热情",
    "承诺像泡沫，说出口就破了"
  ];

  const randomPlaceholder = placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          前任检测仪
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-2">
          科学分析你的前任，AI生成专属毒鸡汤
        </p>
        <p className="text-sm text-gray-500">
          输入关于TA的任何事情，让宇宙为你做个诊断
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <label htmlFor="ex-input" className="block text-sm font-medium text-gray-700 mb-3">
            说说你的前任吧... 💔
          </label>
          <textarea
            id="ex-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={randomPlaceholder}
            className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            disabled={isAnalyzing}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">
              {input.length}/500 字符
            </span>
            <span className="text-xs text-gray-400">
              💡 越详细越准确哦
            </span>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={!input.trim() || isAnalyzing}
            className={`btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isAnalyzing ? 'animate-pulse' : ''
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="ml-2">检测中...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>🔍</span>
                <span>开始检测</span>
              </span>
            )}
          </button>
        </div>
      </form>

      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">
          📢 本检测纯属娱乐，结果无科学依据。如有雷同…那TA可能真的很典型 😉
        </p>
      </div>
    </div>
  );
};

export default InputSection;