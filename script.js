let activeList = '';  // To track which list is active

// Show the Master List and Shopping List when the circles are clicked
document.getElementById('masterListCircle').addEventListener('click', function() {
    activeList = 'master'; // Set active list to master list
    showListCreation('master');
});

document.getElementById('shoppingListCircle').addEventListener('click', function() {
    activeList = 'shopping'; // Set active list to shopping list
    showListCreation('shopping');
});

// Function to show the relevant list creation section
function showListCreation(listType) {
    // Hide both list sections initially
    document.getElementById('masterListSection').style.display = 'none';
    document.getElementById('shoppingListSection').style.display = 'none';

    // Show the active list section
    if (listType === 'master') {
        document.getElementById('masterListSection').style.display = 'block';
        document.getElementById('masterItemInput').focus();
    } else if (listType === 'shopping') {
        document.getElementById('shoppingListSection').style.display = 'block';
        document.getElementById('shoppingItemInput').focus();
    }
}

// Function to handle adding items to the list
function addItemToList() {
    const inputField = activeList === 'master' ? document.getElementById('masterItemInput') : document.getElementById('shoppingItemInput');
    const errorMessage = activeList === 'master' ? document.getElementById('masterErrorMessage') : document.getElementById('shoppingErrorMessage');
    const list = activeList === 'master' ? document.getElementById('masterList') : document.getElementById('shoppingList');

    const itemValue = inputField.value.trim();
    
    if (itemValue !== '') {
        // Check for duplicate items
        const existingItems = list.querySelectorAll('li');
        for (let i = 0; i < existingItems.length; i++) {
            const existingItemText = existingItems[i].querySelector('span').textContent;
            if (existingItemText.toLowerCase() === itemValue.toLowerCase()) {
                errorMessage.textContent = 'This item already exists in the list.';
                errorMessage.style.visibility = 'visible';
                inputField.value = '';
                return;
            }
        }

        // Hide error message and add the new item
        errorMessage.style.visibility = 'hidden';

        const listItem = document.createElement('li');
        listItem.classList.add('swipe-item');
        
        const itemText = document.createElement('span');
        itemText.textContent = itemValue;
        listItem.appendChild(itemText);

        // Create and append the amount input field for the item
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.classList.add('amount-input');
        amountInput.placeholder = 'Qty';
        amountInput.value = 0;  // Default quantity value
        amountInput.min = 0;    // Minimum value for quantity
        amountInput.max = 999;    // Max value for quantity

        // Add an event listener to only allow numbers and show the numeric keypad
        amountInput.addEventListener('focus', function() {
            amountInput.select();  // Select the value to quickly edit on focus
        });

        listItem.appendChild(amountInput);  // Append the amount input field to the list item

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            listItem.remove();
        });

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);

        // Clear the input field
        inputField.value = '';

        // Optionally, add swipe functionality if you haven't already done so
        addSwipeHandler(listItem);
    }
}

// Add the Enter key event listener to the input fields for each list
document.getElementById('masterItemInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItemToList();
    }
});

document.getElementById('shoppingItemInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItemToList();
    }
});

// Function to handle swipe-to-delete functionality
function addSwipeHandler(listItem) {
    let startX;

    listItem.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        listItem.classList.remove('deleted');
        listItem.style.transition = 'none';
    });

    listItem.addEventListener('touchmove', function(event) {
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - startX;

        if (deltaX < 0) {
            listItem.style.transform = `translateX(${deltaX}px)`;
        }
    });

    listItem.addEventListener('touchend', function(event) {
        const deltaX = event.changedTouches[0].clientX - startX;

        if (deltaX < -100) {
            listItem.classList.add('deleted');
            listItem.style.transition = 'transform 0.3s ease-out';
            listItem.style.transform = 'translateX(-100%)';
            setTimeout(() => listItem.remove(), 300);
        } else {
            listItem.style.transition = 'transform 0.3s ease-out';
            listItem.style.transform = 'translateX(0)';
        }
    });
}


