document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        // Create a new table row
        const row = document.createElement('tr');

        // Insert cells into the row
        row.innerHTML = `
            <td>${amount}</td>
            <td>${description}</td>
            <td>${category}</td>
            <td>
                <button class="btn btn-secondary btn-sm edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
        `;

        // Append the row to the expense list
        expenseList.appendChild(row);

        // Clear the form fields
        expenseForm.reset();
    });

    // Event delegation for delete and edit buttons
    expenseList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.closest('tr').remove();
        } else if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const cells = row.children;

            // Populate form with existing data
            document.getElementById('amount').value = cells[0].textContent;
            document.getElementById('description').value = cells[1].textContent;
            document.getElementById('category').value = cells[2].textContent;

            // Remove the row from the list
            row.remove();
        }
    });
});
