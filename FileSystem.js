const fs = require('fs');
const path = require('path');

module.exports = class FileSystem {
  static getFilePath(filename) {
    return path.join(__dirname, 'accounts', `${filename}.txt`);
  }

  static read(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.getFilePath(filename), 'utf-8', (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static write(filename, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.getFilePath(filename), content.toString(), err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};
