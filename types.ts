
export interface WeatherData {
  id: string;
  city: string;
  country: string;
  currentTemp: number;
  condition: string;
  high: number;
  low: number;
  wind?: string; // e.g., "Fast Wind"
  description?: string; // e.g., "Mid Rain"
  hourly: HourlyForecast[];
  daily: DailyForecast[]; // New field for 5-day forecast
  bgGradient: string; // Tailwind gradient class
  iconType: 'rain' | 'cloudy' | 'clear' | 'thunder';
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: 'cloudy' | 'rain' | 'clear' | 'thunder';
  isNow?: boolean;
}

export interface DailyForecast {
  day: string;
  icon: 'cloudy' | 'rain' | 'clear' | 'thunder';
  high: number;
  low: number;
}

export type ViewState = 'onboarding' | 'detail' | 'list';
