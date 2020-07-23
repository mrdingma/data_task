const fake = require("./fake_data");

module.exports = {
  header:
    "Date,Rater,Correct_Answer_3_Label,Correct_Answer_5_Label,Rater_Answer_3_Label,Rater_Answer_5_Label,Label_Agreement_3,Label_Agreement_5,TaskID\n",
  stringGen: (id) =>
    `${fake.date()},${fake.raterID()},${fake.labels()},${id},\n`,
};
