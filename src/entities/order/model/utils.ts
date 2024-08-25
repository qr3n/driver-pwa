export const calculateCost = (rawData: number, tariff: 'day' | 'night') => Math.round(rawData / 1000 * 42) + (tariff === 'day' ? 800 : 1000)
export const calculateDistance = (rawData: number) => (rawData / 1000).toFixed(1).toString().replace('.', ',')
