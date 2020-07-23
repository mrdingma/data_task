const rater = ["A", "B", "C", "D", "E"];
const label3 = ["Low", "Average", "High"];
const label5 = ["Bad", "Okay", "Intermediate", "Great", "Exceptional"];

function randomDateAfterDate() {
  const start = new Date(2005, 9, 1);
  const randDate = new Date(
    start.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  );

  return `${randDate.getMonth() + 1}/${randDate.getDate()}/${(
    "" + randDate.getFullYear()
  ).slice(2)}`;
}

function labelGen() {
  const correctAnswers3 = label3[Math.floor(Math.random() * label3.length)];
  const correctAnswers5 = label5[Math.floor(Math.random() * label5.length)];
  const raterAnswers3 = label3[Math.floor(Math.random() * label3.length)];
  const raterAnswers5 = label5[Math.floor(Math.random() * label5.length)];
  const agree3 = correctAnswers3 === raterAnswers3 ? "yes" : "no";
  const agree5 = correctAnswers5 === raterAnswers5 ? "yes" : "no";

  return `${correctAnswers3},${correctAnswers5},${raterAnswers3},${raterAnswers5},${agree3},${agree5}`;
}

module.exports = {
  date: () => randomDateAfterDate(),
  raterID: () => rater[Math.floor(Math.random() * rater.length)],
  labels: () => labelGen(),
};
