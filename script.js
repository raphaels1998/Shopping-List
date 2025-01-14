document.getElementById('itemInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const itemInput = document.getElementById('itemInput');
        const itemValue = itemInput.value.trim();

        if (itemValue.length === 0) {
            showTemporaryMessage('Please enter an item.');
        } else if (itemValue.length > 25) {
            showTemporaryMessage('Item is too long. Please enter a shorter item.');
        } else {
            addItemToList(itemValue);
            itemInput.value = ''; // Clear the input field
        }
    }
});

function addItemToList(itemValue) {
    const listItem = document.createElement('li');
    listItem.classList.add('swipe-item');

    const itemText = document.createElement('span');
    itemText.textContent = itemValue;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        listItem.remove(); // Remove the item when clicked
    });

    listItem.appendChild(itemText);
    listItem.appendChild(deleteButton);
    document.getElementById('shoppingList').appendChild(listItem);

    // Add swipe functionality
    addSwipeHandler(listItem);
}

function addSwipeHandler(listItem) {
    let startX;

    listItem.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX; // Get the initial touch position
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
            listItem.style.transform = 'translateX(-100%)';
            listItem.style.opacity = '0';
            setTimeout(() => listItem.remove(), 300); // Remove after animation
        } else {
            listItem.style.transform = 'translateX(0)'; // Reset position
        }
    });
}

function showTemporaryMessage(message) {
    const messageDiv = document.getElementById('temporaryMessage');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 3000);
}
