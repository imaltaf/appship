// utils/defaults.js
export function withDefaultOnError(fn, defaultValue) {
    try {
      return fn();
    } catch (error) {
      console.error('Error occurred:', error);
      return defaultValue;
    }
  }
  