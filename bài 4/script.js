const numCustomersInput = document.getElementById('num-customers');
const customerNeedsElement = document.getElementById('customer-needs');
const maxDaysElement = document.getElementById('max-days');
const selectedCustomersElement = document.getElementById('selected-customers');
const solveButton = document.getElementById('solve');

function generateCustomerNeedsInputs() {
    const numCustomers = parseInt(numCustomersInput.value);
    customerNeedsElement.innerHTML = '';
    for (let i = 1; i <= numCustomers; i++) {
        customerNeedsElement.innerHTML += `
            <p>Khách hàng ${i}:</p>
            <input type="text" id="customer-needs-${i}" value="1,2,3">
        `;
    }
}

function solve() {
    const numCustomers = parseInt(numCustomersInput.value);
    const customerNeeds = [];
    for (let i = 1; i <= numCustomers; i++) {
        customerNeeds.push(document.getElementById(`customer-needs-${i}`).value.split(',').map(Number));
    }

    const dp = new Array(numCustomers + 1).fill(0);
    const selectedCustomers = new Array(numCustomers + 1).fill([]);

    for (let i = 1; i <= numCustomers; i++) {
        for (let j = 0; j < i; j++) {
            const intersection = customerNeeds[i].filter(day => customerNeeds[j].includes(day));
            if (intersection.length === 0) {
                const newTotalDays = dp[j] + customerNeeds[i].length;
                if (newTotalDays > dp[i]) {
                    dp[i] = newTotalDays;
                    selectedCustomers[i] = [...selectedCustomers[j], i];
                }
            }
        }
    }

    const maxDays = dp[numCustomers];
    const selectedCustomerIds = selectedCustomers[numCustomers];
    const selectedCustomersText = selectedCustomerIds.map(id => `Khách hàng ${id + 1}`).join(', ');

    maxDaysElement.textContent = maxDays;
    selectedCustomersElement.innerHTML = selectedCustomersText;
}

generateCustomerNeedsInputs();

solveButton.addEventListener('click', solve);
