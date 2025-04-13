import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerHistory } from '../context/TimerContext';

export const getTimers = async (): Promise<Timer[]> => {
  const data = await AsyncStorage.getItem('timers');
  return data ? JSON.parse(data) : [];
};

export const saveTimers = async (timers: Timer[]): Promise<void> => {
  await AsyncStorage.setItem('timers', JSON.stringify(timers));
};

export const getHistory = async (): Promise<TimerHistory[]> => {
  const data = await AsyncStorage.getItem('history');
  return data ? JSON.parse(data) : [];
};

export const saveHistory = async (history: TimerHistory[]): Promise<void> => {
  await AsyncStorage.setItem('history', JSON.stringify(history));
};
