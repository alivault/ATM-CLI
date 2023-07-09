const FileSystem = require('./FileSystem');

module.exports = class Account {
  constructor(name) {
    this.#name = name;
    this.#balance = 0;
  }

  #name;
  #balance;

  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }

  async #load() {
    const balanceStr = await FileSystem.read(this.name);
    this.#balance = parseInt(balanceStr, 10);
  }

  async withdraw(amount) {
    if (this.balance < amount) throw new Error('Insufficient funds');
    await FileSystem.write(this.name, String(this.#balance - amount));
    this.#balance -= amount;
  }

  async deposit(amount) {
    await FileSystem.write(this.name, String(this.#balance + amount));
    this.#balance += amount;
  }

  static async find(accountName) {
    const account = new Account(accountName);

    try {
      await account.#load();
      return account;
    } catch (e) {
      return null;
    }
  }

  static async create(accountName) {
    const account = new Account(accountName);

    try {
      await FileSystem.write(account.name, '0');
      account.#balance = 0;
      return account;
    } catch (e) {
      return null;
    }
  }
};
