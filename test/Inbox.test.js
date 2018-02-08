const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // we capitalize constructor function
const web3 = new Web3(ganache.provider()); // initialize instance w/ provider
const { interface, bytecode } = require('../compile')

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   })
  accounts = await web3.eth.getAccounts(); // async/await alternative to 'then'

  // Use one off those accounts to deploy the contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // interface is our ABI, bytecode is contract bytecode
    .deploy({ data: bytecode, arguments: ['Hi there!'] }) // arguments = Inbox constructor arguments
    .send({ from: accounts[0], gas: '1000000' }) // account to send transaction from (already supplied and unlocked by ganache)
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});
// class Car {
//   park() {
//     return 'stopped';
//   }
//
//   drive() {
//     return 'vroom';
//   }
// }
//
// describe('Car', () => {
//   let car;
//
//   beforeEach(() => {
//     car = new Car();
//   })
//
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//
//   it('can drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });
