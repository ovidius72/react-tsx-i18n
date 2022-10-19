/* eslint-disable prettier/prettier */
//------------------------------------------------------------------//
//                               DRY                                //
//                       Dont Repeat Yourself                       //
//------------------------------------------------------------------//

type AmountType = { sign: number; amount: number };
type Account = {
  debits: AmountType;
  credits: AmountType;
  fees: AmountType;
  balance: AmountType;
};

const account: Account = {
  debits: { sign: 1, amount: 189 },
  credits: { sign: 1, amount: 10.5 },
  balance: { sign: 1, amount: 149.0 },
  fees: { sign: -1, amount: 12 },
};

const printBalance = (account: Account) => {
  console.log(`${'Debit'.padEnd(15)} ${account.debits.amount.toFixed(2)}`);
  console.log(`${'Credits'.padEnd(15)} ${account.credits.amount.toFixed(2)}`);
  if (account.fees.sign < 0) {
    console.log(`${'Fees'.padEnd(15)} -${account.fees.amount.toFixed(2)}`);
  } else {
    console.log(`${'Fees'.padEnd(15)} ${account.fees.amount.toFixed(2)}`);
  }
  console.log('------------');
  if (account.balance.sign < 0) {
    console.log(
      `${'Balance'.padEnd(15)} -${account.balance.amount.toFixed(2)}`,
    );
  } else {
    console.log(`${'Balance'.padEnd(15)} ${account.balance.amount.toFixed(2)}`);
  }
};

console.log('TEST 1: >>>>>>>>>>>>>>>>');
printBalance(account);
console.log('END Test 1 <<<<<');

// 1 - copy/past for negative values.
//const formatAmount = (value: AmountType) => {
//  const symbol = value.sign < 0 ? '-' : '';
//  return `${symbol}${value.amount.toFixed(2)}`;
//};

//const printBalance2 = (account: Account) => {
//  console.log(`${'Debit'.padEnd(15)} ${account.debits.amount.toFixed(2)}`);
//  console.log(`${'Credits'.padEnd(15)} ${account.credits.amount.toFixed(2)}`);
//  console.log(`${'Fees'.padEnd(15)} ${formatAmount(account.fees)}`);
//  console.log('------------');
//  console.log(`${'Balance'.padEnd(15)} ${formatAmount(account.balance)}`);
//};

//console.log('');
//console.log('');
//console.log('');
//console.log('TEST 2: >>>>>>>>>>>>>>>>');
//printBalance2(account);
//console.log('END Test 2 <<<<<');

//// 2 -  Repetition of toFixed.
//const printBalance3 = (account: Account) => {
//  console.log(`${'Debit'.padEnd(15)} ${formatAmount(account.debits)}`);
//  console.log(`${'Credits'.padEnd(15)} ${formatAmount(account.credits)}`);
//  console.log(`${'Fees'.padEnd(15)} ${formatAmount(account.fees)}`);
//  console.log('------------');
//  console.log(`${'Balance'.padEnd(15)} ${formatAmount(account.balance)}`);
//};

//console.log('');
//console.log('');
//console.log('');
//console.log('TEST 3: >>>>>>>>>>>>>>>>');
//printBalance3(account);
//console.log('END Test 3 <<<<<');

//// 3 -  Repetition of padEnd.
//const reportLine = (label: string, amount: AmountType) => {
//  console.log(`${label.padEnd(15)} ${formatAmount(amount)}`);
//};
//const printBalance4 = (account: Account) => {
//  reportLine('Debit', account.debits);
//  reportLine('Credits', account.credits);
//  reportLine('Fees', account.credits);
//  console.log('------------');
//  reportLine('Balance', account.balance);
//};

//console.log('');
//console.log('');
//console.log('');
//console.log('TEST 4: >>>>>>>>>>>>>>>>');
//printBalance4(account);
//console.log('END Test 4 <<<<<');

////------------------------------------------------------------------//
////                             WARNING                              //
////------------------------------------------------------------------//

//const validateType = (value: unknown) => typeof value === 'number';
//const validateMinInteger = (value: number) => value > 0;

//const validateAge = (value: number) => {
//  return validateMinInteger(value) && validateType(value);
//};

//const validateQuantity = (value: number) => {
//  return validateMinInteger(value) && validateType(value);
//};
//console.log('*****: validateQuantity', validateQuantity(2));
//console.log('*****: validateAge', validateAge(22));

//// DIFFERENT INTEND.
////
////------------------------------------------------------------------//
////                              NOTICE                              //
////        NOT ALL CODE DUPLICATION IS KNOWLEDGE DUPLICATION         //
////------------------------------------------------------------------//
