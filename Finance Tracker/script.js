let transactions = [];

let income = 0;
let expenses = 0;

const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function() {

    // Get input values

    const date = document.getElementById('date').value;
    const amount = Number(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const mode = document.getElementById('mode').value; 

    // Save transaction

    const transaction = {
        date: date,
        amount: amount,
        type: type,
        mode: mode
    };

    transactions.push(transaction);

    // add row to table

    const transactionBody = document.getElementById('transactionBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${date}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td>${mode}</td>
    `;

    transactionBody.appendChild(row);

    // update totals
    if (type === 'Income') {
        income += amount;
    } else {
        expenses += amount;
    }

    document.getElementById('income').innerText = "Income: ₹${income};"
    document.getElementById('expenses').innerText = "Expenses: ₹${expenses};"
    document.getElementById('total').innerText = "Total Balance: ₹${income - expenses};"

});