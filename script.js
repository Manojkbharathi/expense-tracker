"use strict";
const availableBalance = document.getElementById("remaining-amount");
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const transactionEl = document.getElementById("transaction-history");
const amountEl = document.getElementById("amount");
const listContainerEl = document.getElementById("list");
const formEl = document.getElementById("form");
const selectEl = document.getElementById("select-type");

let transactions = localStorage.getItem("transactions");
//global variables
transactions = transactions ? JSON.parse(transactions) : [];
let income = 0;
let expense = 0;
let balance = 0;
const init = () => {
  addTransactionToDOM(transactions);
  calculate(transactions);
};
const calculate = (transactions) => {
  //crearing new array by using map method it'll aplied on each function and returns new array
  // usinf filter methdod to get positive values
  const incomeArray = [];
  const expenseArray = [];

  transactions.map((value) => {
    const number = Number(value.amount);
    value.amtType === "income"
      ? incomeArray.push(number)
      : expenseArray.push(number);
  });

  income = incomeArray.reduce((total, val) => total + val, 0);
  expense = expenseArray.reduce((total, val) => total + val, 0);
  // console.log(amountArr);
  balance = income - expense;

  incomeAmount.innerText = `${income}`;
  expenseAmount.innerText = `- ${expense}`;
  availableBalance.innerText = `${balance}`;
};
const deleteTransactionItem = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  addTransactionToDOM(transactions);
};

const addTransactionToDOM = (transactions) => {
  listContainerEl.innerHTML = null;

  transactions.forEach((transactionItem) => {
    // destructuring the transactionitem object

    const { id, transaction, amount, amtType } = transactionItem;

    const listElement = document.createElement("li");
    // adding cls name
    if (amtType === "income") {
      listElement.className = "plus";
    } else {
      listElement.className = "minus";
    }
    // add inner html

    listElement.innerHTML = ` ${transaction} <span>${amount}</span> <button class="delete-btn" onClick = "deleteTransactionItem(${id})">x</button>
        </li>`;

    listContainerEl.appendChild(listElement);
  });
};

//event listners

formEl.addEventListener("submit", (event) => {
  event.preventDefault;
  const transaction = transactionEl.value.trim();
  const amount = Number(amountEl.value.trim());
  let type = selectEl.value;
  const transactionItem = {
    id: Date.now(),
    transaction: transaction,
    amtType: type,
    amount,

    // pushing objet into yhe array
  };

  // validation

  if (transaction && amount && (type === "income" || type === "expense")) {
    // creating transaction (list )object

    transactions.push(transactionItem);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    addTransactionToDOM(transactions);
    calculate(transactions);
  } else {
    alert("All fields are mandatory");
  }

  transactionEl.value = null;
  amountEl.value = null;
});

init();
