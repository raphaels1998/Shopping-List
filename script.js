// Function to handle adding items to the Master List
document.getElementById('masterListInput').addEventListener('keydown', function(event) {
    const itemInput = document.getElementById('masterListInput');
    const itemValue = itemInput.value.trim();
    const errorMessage = document.getElementById('masterListError');

    // Check if the key pressed is "Enter"
    if (event.key === 'Enter') {
        if (itemValue !== '') {
            // Check for duplicates in the Master List
            const existingItems = document.querySelectorAll('#masterList li');
            for (let i = 0; i < existingItems.length; i++) {
                const existingItemText = existingItems[i].querySelector('span').textContent;
                if (existingItemText.toLowerCase() === itemValue.toLowerCase()) {
                    errorMessage.textContent = 'This item already exists in the master list.';
                    errorMessage.style.visibility = 'visible';
                    itemInput.value = ''; // Clear the input field
                    return;
                }
            }

            // Hide error message and add item to the Master List
            errorMessage.style.visibility = 'hidden';
            const listItem = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.textContent = itemValue;
            listItem.appendChild(itemText);

            // Add the "Add to Shopping List" button
            const addToShoppingButton = document.createElement('button');
            addToShoppingButton.textContent = 'Add to Shopping List';
            addToShoppingButton.className = 'add-to-shopping-button';
            addToShoppingButton.addEventListener('click', function() {
                addToShoppingList(itemValue);  // Function to add item to shopping list
            });
            listItem.appendChild(addToShoppingButton);

            // Append the new item to the Master List
            document.getElementById('masterList').appendChild(listItem);
            itemInput.value = '';  // Clear input field after adding the item
        }
    }
});

// Function to add an item to the Shopping List
function addToShoppingList(itemValue) {
    const shoppingListInput = document.getElementById('shoppingListInput');
    const itemText = document.createElement('span');
    itemText.textContent = itemValue;

    // Create the amount input for quantity (only numbers allowed, between 1 and 999)
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.min = 1;
    amountInput.max = 999;
    amountInput.step = 1;
    amountInput.value = 1;

    // Add event listener to allow only valid numbers (1-999) and show the numeric keyboard on mobile
    amountInput.addEventListener('input', function() {
        if (amountInput.value < 1) amountInput.value = 1;
        if (amountInput.value > 999) amountInput.value = 999;
    });

    // Create the delete button to remove an item from the shopping list
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        this.parentElement.remove();
    });

    // Create the list item and append the elements
    const listItem = document.createElement('li');
    listItem.appendChild(itemText);
    listItem.appendChild(amountInput);
    listItem.appendChild(deleteButton);

    // Append the new item to the Shopping List
    document.getElementById('shoppingList').appendChild(listItem);

    // Clear the input field in the shopping list section
    shoppingListInput.value = '';
}

// Function to handle adding items to the Shopping List directly from the input field
document.getElementById('shoppingListInput').addEventListener('keydown', function(event) {
    const itemInput = document.getElementById('shoppingListInput');
    const itemValue = itemInput.value.trim();
    const errorMessage = document.getElementById('shoppingListError');

    if (event.key === 'Enter') {
        if (itemValue !== '') {
            // Check for duplicates in the Shopping List
            const existingItems = document.querySelectorAll('#shoppingList li');
            for (let i = 0; i < existingItems.length; i++) {
                const existingItemText = existingItems[i].querySelector('span').textContent;
                if (existingItemText.toLowerCase() === itemValue.toLowerCase()) {
                    errorMessage.textContent = 'This item already exists in the shopping list.';
                    errorMessage.style.visibility = 'visible';
                    itemInput.value = ''; // Clear input
                    return;
                }
            }

            // Hide error message and add item to Shopping List
            errorMessage.style.visibility = 'hidden';
            const listItem = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.textContent = itemValue;
            listItem.appendChild(itemText);

            // Create the amount input field for quantity
            const amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.min = 1;
            amountInput.max = 999;
            amountInput.step = 1;
            amountInput.value = 1;

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function() {
                this.parentElement.remove();
            });

            // Append amount input and delete button to the list item
            listItem.appendChild(amountInput);
            listItem.appendChild(deleteButton);

            // Append the list item to the Shopping List
            document.getElementById('shoppingList').appendChild(listItem);
            itemInput.value = '';  // Clear the input field after adding the item
        }
    }
});

// Restrict input length to 25 characters while typing for both input fields
document.getElementById('masterListInput').addEventListener('input', function(event) {
    const itemInput = document.getElementById('masterListInput');
    if (itemInput.value.length > 25) {
        itemInput.value = itemInput.value.substring(0, 25); // Truncate the input to 25 characters
    }
});

document.getElementById('shoppingListInput').addEventListener('input', function(event) {
    const itemInput = document.getElementById('shoppingListInput');
    if (itemInput.value.length > 25) {
        itemInput.value = itemInput.value.substring(0, 25); // Truncate the input to 25 characters
    }
});

