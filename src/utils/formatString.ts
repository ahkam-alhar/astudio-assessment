export const formatString = (inputString: string) => {
  // Insert space before uppercase letters and convert to uppercase
  let formattedString = inputString.replace(/([A-Z])/g, ' $1').toUpperCase();

  return formattedString;
};
