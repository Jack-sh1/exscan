import React, { useState, useEffect } from 'react';
import { loadingTexts } from '../data/reportData';
import { getRandomItem } from '../utils/getRandom';

interface LoadingProps {
  onComplete: () => void;
  duration?: number;
}

const Loading: React.FC<LoadingProps> = ({ onComplete, duration = 2500 }) => {
  const [currentText, setCurrentText] = useState(loadingTexts[0]);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // 文案轮播
    const textInterval = setInterval(() => {
      setCurrentText(getRandomItem(loadingTexts));
    }, 400);

    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    // 故障效果
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 800);

    // 完成回调
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="card p-8 text-center">
        {/* 主标题 */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            AI正在分析中...
          </h2>
          <p className="text-gray-600">
            请稍等，宇宙正在为你生成专属报告
          </p>
        </div>

        {/* 中央加载动画 */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* 外圈旋转 */}
            <div className="w-24 h-24 border-4 border-purple-200 rounded-full animate-spin">
              <div className="w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            
            {/* 中心图标 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-3xl transition-all duration-100 ${glitchActive ? 'transform scale-110 text-pink-500' : 'text-purple-500'}`}>
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* 动态文案 */}
        <div className="mb-6">
          <p className={`text-lg font-medium transition-all duration-200 ${glitchActive ? 'text-pink-600 transform scale-105' : 'text-gray-700'}`}>
            {currentText}
          </p>
        </div>

        {/* 进度条 */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {progress}% 完成
          </p>
        </div>

        {/* 装饰性元素 */}
        <div className="flex justify-center space-x-4 text-2xl opacity-60">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>💔</span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🔬</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>📊</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>✨</span>
        </div>

        {/* 底部提示 */}
        <div className="mt-6 text-xs text-gray-400">
          <p>正在连接量子情感数据库...</p>
          <p className="mt-1">请勿关闭页面，马上就好！</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;