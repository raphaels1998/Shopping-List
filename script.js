document.getElementById('itemInput').addEventListener('keydown', function(event) {
    const itemInput = document.getElementById('itemInput');
    const itemValue = itemInput.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (event.key === 'Enter') {
        if (itemValue !== '') {
            // Ensure item input is not more than 25 characters
            if (itemValue.length > 25) {
                itemInput.value = itemInput.value.substring(0, 25); // Automatically truncate to 25 characters
                return;
            }

            // Check for duplicate items in the list
            const existingItems = document.querySelectorAll('#shoppingList li');
            for (let i = 0; i < existingItems.length; i++) {
                const existingItemText = existingItems[i].querySelector('span').textContent;
                if (existingItemText.toLowerCase() === itemValue.toLowerCase()) {  // Case-insensitive comparison
                    // Show error message for duplicate
                    errorMessage.textContent = 'This item already exists in the list.';
                    errorMessage.style.visibility = 'visible';  // Make the message visible
                    itemInput.value = ''; // Clear the input field
                    return; // Exit the function if a duplicate is found
                }
            }

            // Hide the error message if item is added successfully
            errorMessage.style.visibility = 'hidden';

            const listItem = document.createElement('li');
            listItem.classList.add('swipe-item'); // Add swipe class to list item

            // Create and append the item text
            const itemText = document.createElement('span');
            itemText.textContent = itemValue;

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button'; // Adding class for styling

            // Event listener to remove the item when the button is clicked
            deleteButton.addEventListener('click', function() {
                listItem.remove(); // Remove the item when clicked
            });

            // Append both the item text and the delete button to the list item
            listItem.appendChild(itemText);
            listItem.appendChild(deleteButton);

            // Append the list item to the shopping list
            document.getElementById('shoppingList').appendChild(listItem);
            itemInput.value = ''; // Clear the input field

            // Add swipe handler to the list item
            addSwipeHandler(listItem);
        }
    }
});

// Restrict input length to 25 characters while typing
document.getElementById('itemInput').addEventListener('input', function(event) {
    const itemInput = document.getElementById('itemInput');
    if (itemInput.value.length > 25) {
        itemInput.value = itemInput.value.substring(0, 25); // Truncate the input to 25 characters
    }

    // Hide the error message as the user starts typing again
    const errorMessage = document.getElementById('error-message');
    if (errorMessage.style.visibility === 'visible') {
        errorMessage.style.visibility = 'hidden';
    }
});

// Event listener for when the input field is focused (keyboard shows)
document.getElementById('itemInput').addEventListener('focus', function() {
    document.body.style.zoom = '100%';  // Reset zoom to 100% when focusing
});

// Event listener for when the input field loses focus (keyboard hides)
document.getElementById('itemInput').addEventListener('blur', function() {
    // Delay setting zoom out after the input loses focus to avoid page movement
    setTimeout(function() {
        document.body.style.zoom = '100%';  // Reset zoom to 100% after typing
        window.scrollTo(0, 0);  // Scroll back to the top (ensures no unwanted page scroll)
    }, 300); // Delay (optional) to make sure the keyboard closes before resetting zoom
});

// Function to add swipe functionality to a list item
function addSwipeHandler(listItem) {
    let startX;

    listItem.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX; // Get the initial touch position
        listItem.classList.remove('deleted'); // Ensure it doesn't remain deleted if touched again
    });

    listItem.addEventListener('touchmove', function(event) {
        const currentX = event.touches[0].clientX;
        const deltaX = currentX - startX;

        if (deltaX < 0) { // Swiping left
            listItem.style.transform = `translateX(${deltaX}px)`;
        }
    });

    listItem.addEventListener('touchend', function(event) {
        const deltaX = event.changedTouches[0].clientX - startX;

        if (deltaX < -100) { // Swipe threshold to trigger delete
            listItem.classList.add('deleted');
            setTimeout(() => listItem.remove(), 300); // Remove after animation
        } else {
            listItem.style.transform = 'translateX(0)'; // Reset position
        }
    });
}


