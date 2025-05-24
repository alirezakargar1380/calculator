'use client';

export function localStorageAvailable() {
  try {
    if (typeof window !== 'undefined') {
      const test = '__storage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export function localStorageGetItem(key: string, defaultValue = '') {
  try {
    if (!localStorageAvailable()) {
      return defaultValue;
    }
    
    const value = window.localStorage.getItem(key);
    return value || defaultValue;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return defaultValue;
  }
}

export function localStorageSetItem(key: string, value: string) {
  try {
    if (localStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
}