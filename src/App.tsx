import { useState, useEffect } from 'react';
import InputSection from './components/InputSection';
import Loading from './components/Loading';
import ResultCard from './components/ResultCard';
import HistorySection from './components/HistorySection';
import { exTypes, typeDescriptions, poisonousChickenSoup } from './data/reportData';
import { getRandomItem, getValueByKey } from './utils/getRandom';
import { saveToHistory, getHistory, type HistoryItem } from './utils/localStorage';
import type { Report } from './data/reportData';

type AppState = 'input' | 'loading' | 'result';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('input');
  const [report, setReport] = useState<Report | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 加载历史记录
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleStartAnalysis = (input: string) => {
    setCurrentState('loading');
    
    // 生成随机报告
    const randomType = getRandomItem(exTypes);
    const description = getValueByKey(typeDescriptions, randomType);
    const advice = getRandomItem(poisonousChickenSoup);
    
    const newReport: Report = {
      type: randomType,
      description,
      advice,
      userInput: input
    };
    
    setReport(newReport);
  };

  const handleLoadingComplete = () => {
    setCurrentState('result');
    // 保存到历史记录
    if (report) {
      saveToHistory(report);
      setHistory(getHistory()); // 更新历史记录状态
    }
  };

  const handleRestart = () => {
    setCurrentState('input');
    setReport(null);
  };

  const handleHistoryUpdate = () => {
    setHistory(getHistory());
  };

  const handleSelectHistory = (item: HistoryItem) => {
    // 将历史记录转换为Report格式
    const { timestamp, id, ...reportData } = item;
    setReport(reportData);
    setCurrentState('result');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {currentState === 'input' && (
          <>
            <InputSection 
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={false}
            />
            <HistorySection 
              history={history}
              onHistoryUpdate={handleHistoryUpdate}
              onSelectHistory={handleSelectHistory}
            />
          </>
        )}
        
        {currentState === 'loading' && (
          <Loading 
            onComplete={handleLoadingComplete}
            duration={2500}
          />
        )}
        
        {currentState === 'result' && report && (
          <ResultCard 
            report={report}
            onRestart={handleRestart}
          />
        )}
      </div>
      
      {/* 装饰性背景元素 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}

export default App;
