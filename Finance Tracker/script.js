
let income = 0;
let expense = 0;

let selectedType = null; 


const openModalBtn = document.getElementById('openModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');
const saveBtn = document.getElementById('saveTransaction');

const typeButtons = document.querySelectorAll('.type-buttons button');


function resetModal(){
    selectedType = null;
    document.getElementById('modalDate').value = '';
    document.getElementById('modalAmount').value = '';
    document.getElementById('modalMode').selectedIndex = 0;
    document.getElementById('modalNotes').value = '';

    typeButtons.forEach(btn => btn.classList.remove('active'));
    validateModal();
}

function validateModal() {
    const date = document.getElementById('modalDate').value;
    const amount = Number(document.getElementById('modalAmount').value);
    const mode = document.getElementById('modalMode').value;

    saveBtn.disabled = !(selectedType && date && amount > 0 && mode && selectedType);
}

openModalBtn.addEventListener('click', () => {
    resetModal();
    modalOverlay.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        modalOverlay.classList.add('hidden');
    }
});

typeButtons.forEach(button => {
    button.addEventListener('click', () => {

        // remove active from all buttons and add to clicked button
        typeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // store selected type 
        selectedType = button.dataset.type;
        validateModal();
    });
});


document.getElementById('modalDate').addEventListener('input', validateModal);
document.getElementById('modalAmount').addEventListener('input', validateModal);
document.getElementById('modalMode').addEventListener('change', validateModal);

saveBtn.addEventListener('click', () => {

    console.log("Save button clicked");

     // Get input values .value read krne ke liye hota hai
    const date = document.getElementById('modalDate').value;
    const amount = Number(document.getElementById('modalAmount').value);
    const mode = document.getElementById('modalMode').value; 

    if(!selectedType) {
        alert('Please select transaction type.');
        return;
    }


     if(!date || amount <= 0 || !mode) {
        alert('Please fill all required fields correctly.');
        return;
     }


     const transaction = {
        date,
        amount,
        type: selectedType,
        mode
     };


      // add row to table (tr - table row) jb bhi add krna hota hai table me, new row apne app add hojayega
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${selectedType}</td>
            <td>${mode}</td>
        `;
        document.getElementById('transactionBody').appendChild(row);
    
 

    // transactions.push(transaction);

   

    // update totals
    if (selectedType === 'income') {
        income += amount;
    } else if (selectedType === 'expense') {
        expense += amount;
    }

    document.getElementById('income').innerText = `Income: ₹${income}`;
    document.getElementById('expense').innerText = `Expenses: ₹${expense}`;
    document.getElementById('total').innerText = `Total Balance: ₹${income - expense}`;


    // close modal
    modalOverlay.classList.add('hidden');

});