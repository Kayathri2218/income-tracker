const form = document.querySelector("#trans");
const nameInput = document.querySelector("#list");
const amountInput = document.querySelector("#list-amount");
const submitButton = document.querySelector("#submit");
const totalBalance = document.getElementById("total");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const historyList = document.getElementById("show-his");

let transactions = [];

function addTransaction(name, amount) {
    transactions.push({ name, amount });
    renderHistory();
    updateSummary();
}

function renderHistory() {
    historyList.innerHTML = transactions
        .map((t) => `<li id="listItem" onclick="clr()" style="display:flex;justify-content: space-between;
    border: 0px solid #000;background:#fff;border-right:10px solid ${t.amount < 0 ? 'red' : 'green'}; margin:10px 0">
   <div>
     <button id="clr" onclick="clr()" style="background:gray;color:#fff;border:1px solid #fff;padding:18px">X</button>
   </div>
   <div style="padding:8px;"> 
   ${t.name}: $${t.amount}
   </div>
 </li>` )
        .join("");
}

function updateSummary() {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0);
    totalBalance.textContent = `$${total}`;

    const incomes = transactions.filter((t) => t.amount > 0);
    const totalIncome = incomes.reduce((acc, t) => acc + t.amount, 0);
    income.textContent = `$${totalIncome}`;

    const expenses = transactions.filter((t) => t.amount < 0);
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
    expense.textContent = `$${Math.abs(totalExpense)}`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const amount = parseInt(amountInput.value, 10);
    addTransaction(name, amount);
    nameInput.value = "";
    amountInput.value = "";
});

submitButton.disabled = true;
form.addEventListener("input", () => {
    submitButton.disabled = !nameInput.value || !amountInput.value;
});
