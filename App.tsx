
import React, { useState, useEffect } from 'react';
import { DetailView } from './components/DetailView';
import { CityList } from './components/CityList';
import { OnboardingView } from './components/OnboardingView';
import { ViewState, WeatherData } from './types';
import { INITIAL_CITIES } from './constants';
import { GoogleGenAI } from "@google/genai";

const App = () => {
  const [view, setView] = useState<ViewState>('onboarding');
  const [selectedCityId, setSelectedCityId] = useState<string>('antalya');
  const [cities, setCities] = useState<WeatherData[]>(INITIAL_CITIES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentCityData = cities.find(c => c.id === selectedCityId) || cities[0] || INITIAL_CITIES[0];

  const handleNavigateToList = () => {
    setView('list');
  };

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setView('detail');
  };

  const handleDeleteCity = (cityId: string) => {
    if (cities.length <= 1) {
      alert("En az bir şehir listede kalmalıdır.");
      return;
    }
    setCities(prev => prev.filter(c => c.id !== cityId));
    if (selectedCityId === cityId) {
      const remainingCities = cities.filter(c => c.id !== cityId);
      if (remainingCities.length > 0) {
        setSelectedCityId(remainingCities[0].id);
      }
    }
  };

  const refreshWeather = async (cityData: WeatherData) => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Get the current, real-time weather for ${cityData.city}, ${cityData.country}. 
      Include current temperature, high/low, weather condition (e.g. Sunny, Cloudy, Rain), and a short description.
      Also provide a 5-hour forecast and a 5-day forecast.
      IMPORTANT: All hourly forecast times MUST be in 24-hour format (e.g., "14:00", "23:00").
      Return the data strictly in JSON format matching this schema:
      {
        "currentTemp": number,
        "condition": string,
        "high": number,
        "low": number,
        "description": string,
        "hourly": [{"time": string, "temp": number, "icon": "rain"|"cloudy"|"clear"|"thunder"}],
        "daily": [{"day": string, "icon": "rain"|"cloudy"|"clear"|"thunder", "high": number, "low": number}]
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        },
      });

      let rawText = response.text || '{}';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) rawText = jsonMatch[0];
      const result = JSON.parse(rawText);
      
      const sanitizeIcon = (icon: string): 'rain' | 'cloudy' | 'clear' | 'thunder' => {
        const lowerIcon = (icon || '').toLowerCase();
        if (lowerIcon.includes('rain')) return 'rain';
        if (lowerIcon.includes('storm') || lowerIcon.includes('thunder')) return 'thunder';
        if (lowerIcon.includes('cloud')) return 'cloudy';
        if (lowerIcon.includes('sun') || lowerIcon.includes('clear')) return 'clear';
        return 'cloudy';
      };

      const updatedCity: WeatherData = {
        ...cityData,
        currentTemp: result.currentTemp ?? cityData.currentTemp,
        condition: result.condition ?? cityData.condition,
        high: result.high ?? cityData.high,
        low: result.low ?? cityData.low,
        description: result.description ?? cityData.description,
        iconType: sanitizeIcon(result.condition || ''),
        hourly: (result.hourly || []).map((h: any, i: number) => ({
          ...h,
          icon: sanitizeIcon(h.icon || ''),
          isNow: i === 0
        })),
        daily: (result.daily || []).map((d: any) => ({
          ...d,
          icon: sanitizeIcon(d.icon || '')
        }))
      };

      setCities(prev => prev.map(c => c.id === cityData.id ? updatedCity : c));
    } catch (error) {
      console.error("Weather refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddCity = (cityName: string) => {
    if (!cityName.trim()) return;
    const newCity: WeatherData = {
      id: `custom-${Date.now()}`,
      city: cityName,
      country: 'Konum',
      currentTemp: 20,
      condition: 'Yükleniyor...',
      high: 25,
      low: 15,
      description: 'Veriler güncelleniyor...',
      bgGradient: 'from-[#4527A0] to-[#283593]', 
      iconType: 'clear',
      hourly: [],
      daily: []
    };
    setCities(prev => [...prev, newCity]);
    refreshWeather(newCity);
  };

  const fetchMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Tarayıcınız konum özelliğini desteklemiyor.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const myLocationCity: WeatherData = {
          id: 'my-location',
          city: 'Konumum',
          country: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          currentTemp: 20,
          condition: 'Bulunuyor...',
          high: 0,
          low: 0,
          description: 'Hava durumu alınıyor...',
          bgGradient: 'from-[#311B92] to-[#000000]',
          iconType: 'clear',
          hourly: [],
          daily: []
        };
        setCities(prev => {
          const existingIndex = prev.findIndex(c => c.id === 'my-location');
          if (existingIndex >= 0) return prev;
          return [myLocationCity, ...prev];
        });
        setSelectedCityId('my-location');
        refreshWeather(myLocationCity);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Konum bilgisi alınamadı.");
      }
    );
  };

  useEffect(() => {
    const initialCity = cities.find(c => c.id === selectedCityId);
    if (initialCity) refreshWeather(initialCity);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full md:w-[390px] md:h-[844px] md:rounded-[40px] overflow-hidden relative shadow-2xl bg-[#1e1b4b]">
        
        {/* Onboarding View */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${view === 'onboarding' ? 'translate-y-0 opacity-100 z-30' : '-translate-y-full opacity-0 z-0'}`}>
          <OnboardingView onStart={() => setView('detail')} />
        </div>

        {/* Detail View Container */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${view === 'detail' ? 'translate-x-0 opacity-100 z-20' : '-translate-x-full opacity-0 z-0'}`}>
          <DetailView 
            data={currentCityData} 
            onNavigateToList={handleNavigateToList}
            onLocationClick={fetchMyLocation}
            onRefresh={() => refreshWeather(currentCityData)}
            isRefreshing={isRefreshing}
          />
        </div>

        {/* List View Container */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${view === 'list' ? 'translate-x-0 opacity-100 z-20' : 'translate-x-full opacity-0 z-0'}`}>
          <CityList 
            key={cities.length}
            cities={cities}
            onSelectCity={handleSelectCity} 
            onDeleteCity={handleDeleteCity}
            onBack={() => setView('detail')}
            onAddCity={handleAddCity}
          />
        </div>

      </div>
    </div>
  );
};

export default App;
