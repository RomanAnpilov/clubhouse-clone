export const generateRandomCode = (max: number = 9999, min: number = 1000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};