let transactions = [];

let income = 0;
let expense = 0;

const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function() {


   
    

    // Get input values .value read krne ke liye hota hai

    const date = document.getElementById('date').value;
    const amount = Number(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const mode = document.getElementById('mode').value; 


     if(!date || amount <= 0 || isNaN(amount)) {
        alert('Please enter valid date and amount');
        return;
     }

    // Save transaction remember these for future use

    const transaction = {
        date: date,
        amount: amount,
        type: type,
        mode: mode
    };

    transactions.push(transaction);

    // add row to table (tr - table row) jb bhi add krna hota hai table me, new row apne app add hojayega

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
    if (type === 'income') {
        income += amount;
    } else {
        expense += amount;
    }

    document.getElementById('income').innerText = `Income: ₹${income}`;
    document.getElementById('expense').innerText = `Expenses: ₹${expense}`;
    document.getElementById('total').innerText = `Total Balance: ₹${income - expense}`;


    getElementById('amount').value = '';
    getElementById('date').value = '';

});