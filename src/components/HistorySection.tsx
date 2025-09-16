import { formatTimestamp, clearHistory, type HistoryItem } from '../utils/localStorage';

interface HistorySectionProps {
  history: HistoryItem[];
  onHistoryUpdate: () => void;
  onSelectHistory: (item: HistoryItem) => void;
}

function HistorySection({ history, onHistoryUpdate, onSelectHistory }: HistorySectionProps) {
  const handleClearHistory = () => {
    if (window.confirm('确定要清空所有历史记录吗？')) {
      clearHistory();
      onHistoryUpdate();
    }
  };

  if (history.length === 0) {
    return (
      <div className="mt-8">
        <div className="card p-6 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500">暂无检测历史</p>
          <p className="text-sm text-gray-400 mt-1">完成检测后，最近3次结果会显示在这里</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          最近检测记录
        </h3>
        <button
          onClick={handleClearHistory}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          清空
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={item.id}
            className="card p-4 hover:shadow-xl transition-all duration-200 cursor-pointer group"
            onClick={() => onSelectHistory(item)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 mr-2">
                    #{index + 1}
                  </span>
                  <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {item.type}
                  </h4>
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    输入：{item.userInput.length > 20 ? `${item.userInput.slice(0, 20)}...` : item.userInput}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
              </div>
              
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          💡 点击历史记录可以重新查看详细结果
        </p>
      </div>
    </div>
  );
}

export default HistorySection;