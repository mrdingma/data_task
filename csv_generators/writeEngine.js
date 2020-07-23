const fs = require('fs');

module.exports = (header, rowGenFn, count, fileName) => {
  const writer = fs.createWriteStream(fileName, { flags: 'a' });
  writer.write(header);
  let i = 0;

  const write = () => {
    let ok = true;

    do {
      i += 1;
      if (i === count) {
        writer.write(rowGenFn(i));
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(rowGenFn(i));
      }
    } while (i < count && ok);

    if (i <= count) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};
