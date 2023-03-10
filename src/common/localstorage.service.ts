export const CacheService = {
  setProperty(name: string, value: any) {
    localStorage.setItem(name, value);
  },

  getProperty(name: string) {
    return localStorage.getItem(name);
  },

  clearCache() {
    localStorage.clear();
  },

  removeProperty(name: string) {
    localStorage.removeItem(name);
  },
};