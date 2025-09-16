/**
 * 从数组中随机选择一个元素
 * @param array 要选择的数组
 * @returns 随机选中的元素
 */
export function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * 从对象中根据key随机获取value
 * @param obj 要选择的对象
 * @param key 对象的key
 * @returns 对应的value
 */
export function getValueByKey<T>(obj: Record<string, T>, key: string): T {
  return obj[key];
}

/**
 * 生成随机延迟时间（毫秒）
 * @param min 最小延迟时间
 * @param max 最大延迟时间
 * @returns 随机延迟时间
 */
export function getRandomDelay(min: number = 2000, max: number = 3000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}