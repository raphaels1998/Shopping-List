document.getElementById('itemInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const itemInput = document.getElementById('itemInput');
        const itemValue = itemInput.value.trim();

        if (itemValue !== '') {
            // Ensure item input is not more than 25 characters
            if(itemValue.length > 25) {
                itemInput.value = itemInput.value.substring(0, 25); // Automatically truncate to 25 characters
                return;
            }

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
});

function showTemporaryMessage(message) {
    // Remove this function entirely since it's not needed anymore.
}

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
