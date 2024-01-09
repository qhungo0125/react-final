export function formatPhoneNumber(phoneNumber) {
  // Remove any non-numeric characters from the input string
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned string is empty or too short to be a valid phone number
  if (cleaned.length < 10) {
    return cleaned;
  }

  // Format the cleaned string into a readable phone number format
  const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
    3,
    6,
  )}-${cleaned.slice(6, 10)}`;
  return formatted;
}

export function createArrayFrom1ToN(n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}

export function formatDateTime(originalString) {
  var dateObject = new Date(originalString);
  var formattedString = `${(dateObject.getUTCDate() + '').padStart(2, '0')}:${(
    dateObject.getUTCMonth() +
    1 +
    ''
  ).padStart(
    2,
    '0',
  )}:${dateObject.getUTCFullYear()} ${dateObject.getUTCHours()}:${dateObject.getUTCMinutes()}:${dateObject.getUTCSeconds()}`;
  return formattedString;
}
