document.getElementById('itemInput').addEventListener('keydown', function(event) {
    const itemInput = document.getElementById('itemInput');
    const itemValue = itemInput.value.trim();
    const errorMessage = document.getElementById('error-message');

    // Check if the key pressed is "Enter"
    if (event.key === 'Enter') {
        console.log('Enter key pressed');  // Debugging: log that Enter was pressed

        // If the input value is not empty
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
                    console.log('Duplicate found');  // Debugging: log that duplicate was found
                    errorMessage.textContent = 'This item already exists in the list.';
                    errorMessage.style.visibility = 'visible';  // Make the message visible
                    itemInput.value = ''; // Clear the input field
                    return; // Exit the function if a duplicate is found
                }
            }

            // Hide the error message if item is added successfully
            errorMessage.style.visibility = 'hidden';

            // Create a new list item
            const listItem = document.createElement('li');
            listItem.classList.add('swipe-item'); // Add swipe class to list item

            // Create and append the item text
            const itemText = document.createElement('span');
            itemText.textContent = itemValue;
            listItem.appendChild(itemText);  // Append the span to the list item

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button'; // Adding class for styling
            deleteButton.addEventListener('click', function() {
                listItem.remove(); // Remove the item when clicked
            });

            // Append the delete button to the list item
            listItem.appendChild(deleteButton);

            // Append the list item to the shopping list
            document.getElementById('shoppingList').appendChild(listItem);
            itemInput.value = ''; // Clear the input field after adding the item

            console.log('Item added:', itemValue);  // Debugging: log the added item

            // Add swipe functionality to the newly added list item
            addSwipeHandler(listItem);
        } else {
            console.log('Input is empty');  // Debugging: log if the input is empty
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

    // When touch starts, record the starting point
    listItem.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX; // Initial touch point
        listItem.classList.remove('deleted'); // Ensure the item is not in the deleted state
        listItem.style.transition = 'none'; // Disable transition while moving
    });

    // While swiping, move the item horizontally
    listItem.addEventListener('touchmove', function(event) {
        const currentX = event.touches[0].clientX; // Current touch point
        const deltaX = currentX - startX; // Distance moved in X direction
        
        // Only move the item left if swiping left
        if (deltaX < 0) {
            listItem.style.transform = `translateX(${deltaX}px)`; // Move the item
        }
    });

    // When touch ends, decide whether to delete or reset the item
    listItem.addEventListener('touchend', function(event) {
        const deltaX = event.changedTouches[0].clientX - startX; // Distance moved after touch ends

        // If moved enough (threshold), delete the item
        if (deltaX < -100) {
            listItem.classList.add('deleted');
            listItem.style.transition = 'transform 0.3s ease-out'; // Add smooth transition for delete
            listItem.style.transform = 'translateX(-100%)'; // Move item out of view to the left
            setTimeout(() => listItem.remove(), 300); // Remove the item after the animation
        } else {
            listItem.style.transition = 'transform 0.3s ease-out'; // Smooth reset of position
            listItem.style.transform = 'translateX(0)'; // Reset to original position if not swiped enough
        }
    });
}

