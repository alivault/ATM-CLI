const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = class CommandLine {
  static ask(question) {
    return new Promise(resolve => {
      rl.question(`${question} `, answer => {
        resolve(answer);
      });
    });
  }

  static print(text) {
    console.log(text);
  }

  static close() {
    rl.close();
  }
};
