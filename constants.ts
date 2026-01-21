import { WeatherData } from './types';

export const INITIAL_CITIES: WeatherData[] = [
  {
    id: 'antalya',
    city: 'Antalya',
    country: 'Turkey',
    currentTemp: 18,
    condition: 'Sunny',
    high: 22,
    low: 14,
    description: 'Refreshing Weather',
    bgGradient: 'from-[#4A148C] to-[#311B92]',
    iconType: 'clear',
    hourly: [
      { time: 'Şimdi', temp: 18, icon: 'clear', isNow: true },
      { time: '14:00', temp: 21, icon: 'clear' },
      { time: '16:00', temp: 22, icon: 'clear' },
      { time: '18:00', temp: 19, icon: 'cloudy' },
    ],
    daily: [
      { day: 'Pzt', icon: 'clear', high: 22, low: 14 },
      { day: 'Sal', icon: 'clear', high: 23, low: 15 },
      { day: 'Çar', icon: 'cloudy', high: 21, low: 16 },
      { day: 'Per', icon: 'clear', high: 24, low: 17 },
      { day: 'Cum', icon: 'clear', high: 25, low: 18 },
    ]
  },
  {
    id: '1',
    city: 'Montreal',
    country: 'Canada',
    currentTemp: 19,
    condition: 'Mostly Clear',
    high: 24,
    low: 18,
    description: 'Mid Rain',
    bgGradient: 'from-[#4527A0] to-[#283593]',
    iconType: 'rain',
    hourly: [
      { time: 'Şimdi', temp: 19, icon: 'cloudy', isNow: true },
      { time: '02:00', temp: 18, icon: 'cloudy' },
      { time: '03:00', temp: 19, icon: 'rain' },
    ],
    daily: [
      { day: 'Pzt', icon: 'rain', high: 24, low: 18 },
      { day: 'Sal', icon: 'cloudy', high: 22, low: 17 },
      { day: 'Çar', icon: 'clear', high: 25, low: 19 },
    ]
  },
  {
    id: '4',
    city: 'Istanbul',
    country: 'Turkey',
    currentTemp: 22,
    condition: 'Sunny',
    high: 25,
    low: 18,
    description: 'Sunny',
    bgGradient: 'from-[#6A1B9A] to-[#4A148C]',
    iconType: 'clear',
    hourly: [
      { time: 'Şimdi', temp: 22, icon: 'clear', isNow: true },
      { time: '14:00', temp: 24, icon: 'clear' },
    ],
    daily: [
      { day: 'Pzt', icon: 'clear', high: 25, low: 18 },
      { day: 'Sal', icon: 'clear', high: 26, low: 19 },
    ]
  }
];

export const EXTRA_CITIES: WeatherData[] = [];