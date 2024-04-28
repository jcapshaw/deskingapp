export function generateUniqueId(): string {
  // Get the current date and time
  const now = new Date();

  // Format the date as 'YYYYMMDD'
  const dateString = now.toISOString().split('T')[0].replace(/-/g, '');

  // Generate a random 6-digit number
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

  // Combine the date string with the random number
  const uniqueId = `${dateString}${randomSixDigitNumber}`;

  return uniqueId;
}
