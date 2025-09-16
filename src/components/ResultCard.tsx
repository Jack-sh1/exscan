import React, { useState, useEffect } from 'react';
import type { Report } from '../data/reportData';

interface ResultCardProps {
  report: Report;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ report, onRestart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showShareTip, setShowShareTip] = useState(false);

  useEffect(() => {
    // 淡入动画
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    setShowShareTip(true);
    setTimeout(() => setShowShareTip(false), 2000);
  };

  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      '情绪黑洞型': 'from-gray-500 to-black',
      '妈宝Pro Max版': 'from-blue-500 to-purple-500',
      '限定款渣男/女': 'from-red-500 to-pink-500',
      '人间清醒切割机': 'from-cyan-500 to-blue-500',
      '赛博菩萨型': 'from-yellow-500 to-orange-500',
      '选择困难症晚期': 'from-indigo-500 to-purple-500',
      '精神PUA大师': 'from-red-600 to-red-800',
      '冷暴力专业户': 'from-blue-600 to-gray-600',
      '承诺恐惧症患者': 'from-green-500 to-teal-500',
      '双标王者荣耀': 'from-purple-600 to-pink-600',
      '情感吸血鬼': 'from-red-500 to-purple-600',
      '拖延症重度患者': 'from-orange-500 to-red-500'
    };
    return colorMap[type] || 'from-purple-500 to-pink-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* 主报告卡片 */}
        <div className="card p-6 mb-6 relative overflow-hidden">
          {/* 装饰性背景 */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="text-8xl">🔬</div>
          </div>
          
          {/* 报告头部 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-purple-700">检测报告</span>
              <span className="text-sm">📋</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              基于AI分析的前任人格诊断
            </h2>
            <p className="text-sm text-gray-500">
              报告编号: EX-{Date.now().toString().slice(-6)}
            </p>
          </div>

          {/* 用户输入回显 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">你的描述:</h3>
            <p className="text-gray-800 italic">"{report.userInput}"</p>
          </div>

          {/* 检测结果 */}
          <div className="space-y-6">
            {/* 前任类型 */}
            <div className="text-center">
              <div className="inline-block">
                <div className={`bg-gradient-to-r ${getTypeColor(report.type)} text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200`}>
                  <h3 className="text-xl font-bold">{report.type}</h3>
                </div>
              </div>
            </div>

            {/* 类型描述 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">🎯</span>
                类型解析
              </h4>
              <p className="text-gray-700 text-lg">{report.description}</p>
            </div>

            {/* 毒鸡汤建议 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                宇宙建议
              </h4>
              <p className="text-gray-700 text-lg font-medium">{report.advice}</p>
            </div>
          </div>

          {/* 装饰性评分 */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-500">{Math.floor(Math.random() * 30) + 10}%</div>
              <div className="text-xs text-gray-600">挽回可能</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-500">{Math.floor(Math.random() * 20) + 80}%</div>
              <div className="text-xs text-gray-600">解脱指数</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-500">{Math.floor(Math.random() * 30) + 70}%</div>
              <div className="text-xs text-gray-600">准确度</div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>再测一次</span>
          </button>
          
          <button
            onClick={handleShare}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-lg border border-gray-200 transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span>📸</span>
            <span>截图分享</span>
          </button>
        </div>

        {/* 分享提示 */}
        {showShareTip && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
            💡 长按截图分享给朋友吧！
          </div>
        )}

        {/* 免责声明 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            ⚠️ 本检测结果仅供娱乐，不构成任何心理学建议
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;