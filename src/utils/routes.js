/**
 * Utility function to get the correct path for links
 * This handles both development and production environments
 */
export const getPath = (path) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/d17-i3-BestzDeal' : '';
  return `${basePath}${path}`;
};
