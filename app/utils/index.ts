function generateDate(): string {
  const startDate = new Date(2013, 6, 20).getTime(); // July 20, 2013
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() - 1); // One month before today
  const endTime = endDate.getTime();

  const randomTime = startDate + Math.random() * (endTime - startDate);
  const randomDate = new Date(randomTime);

  const year = randomDate.getFullYear();
  const month = randomDate.getMonth() + 1; // Months are 0-based
  const day = randomDate.getDate();

  return `${year}-${month}-${day}`;
}

export default {
  generateDate,
};
