const Account = require('./Account');
const CommandLine = require('./CommandLine');

async function main() {
  try {
    const accountName = await CommandLine.ask(
      'Which account would you like to access?'
    );
    let account = await Account.find(accountName);

    if (!account) {
      account = await promptCreateAccount(accountName);
      if (!account) {
        CommandLine.print('No account selected. Exiting...');
        CommandLine.close();
        return;
      }
    }

    while (true) {
      const task = await promptTask();
      const success = await executeTask(task, account);
      if (!success) break;
    }
  } catch (e) {
    CommandLine.print(`An unexpected error occurred: ${e.message}`);
  } finally {
    CommandLine.close();
  }
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    'Account not found. Would you like to create it? (yes/no)'
  );
  return response.toLowerCase() === 'yes'
    ? await Account.create(accountName)
    : null;
}

async function promptTask() {
  return await CommandLine.ask(
    'What would you like to do? (view/deposit/withdraw/exit)'
  );
}

async function executeTask(task, account) {
  switch (task.toLowerCase()) {
    case 'deposit':
      return await deposit(account);
    case 'withdraw':
      return await withdraw(account);
    case 'view':
      return await view(account);
    case 'exit':
      return false;
    default:
      CommandLine.print('Invalid option selected.');
      return true;
  }
}

async function deposit(account) {
  const amount = parseFloat(
    await CommandLine.ask('How much would you like to deposit?')
  );
  if (isNaN(amount) || amount <= 0) {
    CommandLine.print('Invalid amount provided.');
    return true;
  }
  await account.deposit(amount);
  CommandLine.print(
    `Deposit successful. Your balance is now ${account.balance}.`
  );
  return true;
}

async function withdraw(account) {
  const amount = parseFloat(
    await CommandLine.ask('How much would you like to withdraw?')
  );
  if (isNaN(amount) || amount <= 0) {
    CommandLine.print('Invalid amount provided.');
    return true;
  }
  try {
    await account.withdraw(amount);
    CommandLine.print(
      `Withdrawal successful. Your balance is now ${account.balance}.`
    );
  } catch (e) {
    CommandLine.print(
      `Insufficient funds. Your balance is ${account.balance}.`
    );
  }
  return true;
}

async function view(account) {
  CommandLine.print(`Your balance is ${account.balance}.`);
  return true;
}

main();
