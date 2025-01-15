// Initially hide both sections and show the Master List section
document.getElementById('masterListSection').style.display = 'none';
document.getElementById('shoppingListSection').style.display = 'none';

// Add event listeners to the circles to toggle between the lists
document.getElementById('masterListCircle').addEventListener('click', function() {
    showMasterList();
});
document.getElementById('shoppingListCircle').addEventListener('click', function() {
    showShoppingList();
});

function showMasterList() {
    // Show the Master List section and hide the Shopping List section
    document.getElementById('masterListSection').style.display = 'block';
    document.getElementById('shoppingListSection').style.display = 'none';
    
    // Make the Master List circle active
    document.getElementById('masterListCircle').classList.add('active');
    document.getElementById('shoppingListCircle').classList.remove('active');
}

function showShoppingList() {
    // Show the Shopping List section and hide the Master List section
    document.getElementById('shoppingListSection').style.display = 'block';
    document.getElementById('masterListSection').style.display = 'none';
    
    // Hide the input field in the Shopping List
    document.getElementById('shoppingListInput').style.display = 'none';

    // Make the Shopping List circle active
    document.getElementById('shoppingListCircle').classList.add('active');
    document.getElementById('masterListCircle').classList.remove('active');
}

// Function to handle adding items to the Master List
document.getElementById('masterListInput').addEventListener('keydown', function(event) {
    const itemInput = document.getElementById('masterListInput');
    const itemValue = itemInput.value.trim();
    const errorMessage = document.getElementById('masterListError');

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
    // Check if the item is already in the Shopping List
    const shoppingListItems = document.querySelectorAll('#shoppingList li span');
    for (let i = 0; i < shoppingListItems.length; i++) {
        if (shoppingListItems[i].textContent.toLowerCase() === itemValue.toLowerCase()) {
            alert('This item is already in your shopping list!');
            return; // Prevent adding the item if it's already in the shopping list
        }
    }

    const shoppingListInput = document.getElementById('shoppingListInput');
    const listItem = document.createElement('li');
    
    // Create item name span
    const itemText = document.createElement('span');
    itemText.textContent = itemValue;
    listItem.appendChild(itemText);
    
    // Create the amount input for quantity (only numbers allowed, between 1 and 999)
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.min = 1;
    amountInput.max = 999;
    amountInput.step = 1;
    amountInput.value = 1;

    // Add event listener to allow only valid numbers (1-999)
    amountInput.addEventListener('input', function() {
        if (amountInput.value < 1) amountInput.value = 1;
        if (amountInput.value > 999) amountInput.value = 999;
    });

    // Create the delete button to remove an item from the shopping list
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        listItem.remove();
    });

    // Add swipe functionality to delete
    addSwipeHandler(listItem);

    // Append amount input and delete button to the list item
    listItem.appendChild(amountInput);
    listItem.appendChild(deleteButton);

    // Append the new item to the Shopping List
    document.getElementById('shoppingList').appendChild(listItem);

    // Clear the input field in the shopping list section
    shoppingListInput.value = '';
}


