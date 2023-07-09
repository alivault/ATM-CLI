# Bank Account Command Line Interface (CLI)

This is a simple command-line application that allows a user to interact with virtual bank accounts. A user can access an existing account, create a new account, view an account's balance, deposit to an account, and withdraw from an account. 

## How It Works
The program uses Node.js to run a command-line interface (CLI) that interacts with the user. It keeps track of the account data by writing and reading from a file for each account. This means the data will persist between sessions. All the account files are stored in a directory named "accounts" in the same location as the script.

## Setup and Installation

### Prerequisites
Ensure you have Node.js installed on your system. If not, download it from the [official Node.js website](https://nodejs.org/).

### Steps
1. Open your command line interface (Terminal, Command Prompt, etc.)
2. Navigate to the directory where you want to clone the repo.
3. Clone the repository:
    ```
    git clone https://github.com/alivault/ATM-CLI.git
    ```
4. Navigate to the cloned directory:
    ```
    cd ATM-CLI
    ```
5. Run the script:
    ```
    node script.js
    ```
## How to Use
Once the script is running, follow the prompts in the command line. You will first be asked to input the name of the account you want to access. If the account doesn't exist, you will be asked if you want to create it. After accessing an account, you can choose to view the balance, deposit money, or withdraw money.
