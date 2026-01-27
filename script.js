let balance = 0;

document.getElementById('bankForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const amount = parseFloat(document.getElementById('amount').value);
    const operation = document.getElementById('operation').value;
    let message = '';

    // Polymorphic behavior for deposit and withdraw
    const operations = {
        deposit: function(amount) {
            balance += amount;
            return Deposited $${amount.toFixed(2)}.; // Use toFixed for consistent formatting
        },
        withdraw: function(amount) {
            if (amount > balance) {
                return "Insufficient funds.";
            } else {
                balance -= amount;
                return Withdrew $${amount.toFixed(2)}.; // Use toFixed for consistent formatting
            }
        }
    };

    if (operations[operation]) {
        message = operations[operation](amount);
        document.getElementById('balanceAmount').innerText = balance.toFixed(2); // Update balance display
    } else {
        message = "Please select a valid operation.";
    }

    document.getElementById('message').innerText = message;

    // Clear the form fields
    document.getElementById('bankForm').reset();
});
