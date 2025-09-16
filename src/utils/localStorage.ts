import type { Report } from '../data/reportData';

const HISTORY_KEY = 'exscan_history';
const MAX_HISTORY_COUNT = 3;

export interface HistoryItem extends Report {
  timestamp: number;
  id: string;
}

/**
 * 获取历史记录
 */
export const getHistory = (): HistoryItem[] => {
  try {
    const historyStr = localStorage.getItem(HISTORY_KEY);
    if (!historyStr) return [];
    
    const history = JSON.parse(historyStr) as HistoryItem[];
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.warn('Failed to get history from localStorage:', error);
    return [];
  }
};

/**
 * 保存新的检测结果到历史记录
 */
export const saveToHistory = (report: Report): void => {
  try {
    const history = getHistory();
    
    // 创建新的历史项
    const newItem: HistoryItem = {
      ...report,
      timestamp: Date.now(),
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // 添加到历史记录开头
    const updatedHistory = [newItem, ...history];
    
    // 只保留最近3条记录
    const trimmedHistory = updatedHistory.slice(0, MAX_HISTORY_COUNT);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

/**
 * 清空历史记录
 */
export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to clear history:', error);
  }
};

/**
 * 格式化时间戳为可读格式
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) {
    return '刚刚';
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};