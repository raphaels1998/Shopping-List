let activeList = 'shoppingList'; // Default active list is shopping list

// Show the list creation section and set the active list when clicking a circle
document.getElementById('masterListCircle').addEventListener('click', function() {
    document.getElementById('listCreationSection').style.display = 'block'; // Show the list creation section
    activeList = 'masterList'; // Set active list to Master List
    document.getElementById('itemInput').focus(); // Focus the input field
    document.getElementById('shoppingList').innerHTML = ''; // Clear previous list items if any
});

document.getElementById('shoppingListCircle').addEventListener('click', function() {
    document.getElementById('listCreationSection').style.display = 'block'; // Show the list creation section
    activeList = 'shoppingList'; // Set active list to Shopping List
    document.getElementById('itemInput').focus(); // Focus the input field
    document.getElementById('shoppingList').innerHTML = ''; // Clear previous list items if any
});

// Add your existing code for adding items to the list
document.getElementById('itemInput').addEventListener('keydown', function(event) {
    const itemInput = document.getElementById('itemInput');
    const itemValue = itemInput.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (event.key === 'Enter') {
        console.log('Enter key pressed');

        if (itemValue !== '') {
            if (itemValue.length > 25) {
                itemInput.value = itemInput.value.substring(0, 25);
                return;
            }

            // Check if the item already exists in the active list
            const listToCheck = document.getElementById(activeList);
            const existingItems = listToCheck.querySelectorAll('li');
            for (let i = 0; i < existingItems.length; i++) {
                const existingItemText = existingItems[i].querySelector('span').textContent;
                if (existingItemText.toLowerCase() === itemValue.toLowerCase()) {
                    console.log('Duplicate found');
                    errorMessage.textContent = 'This item already exists in the list.';
                    errorMessage.style.visibility = 'visible';
                    itemInput.value = '';
                    return;
                }
            }

            errorMessage.style.visibility = 'hidden';

            const listItem = document.createElement('li');
            listItem.classList.add('swipe-item');

            const itemText = document.createElement('span');
            itemText.textContent = itemValue;
            listItem.appendChild(itemText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function() {
                listItem.remove();
            });

            listItem.appendChild(deleteButton);

            listToCheck.appendChild(listItem);
            itemInput.value = '';

            addSwipeHandler(listItem);
        } else {
            console.log('Input is empty');
        }
    }
});

// Function to add swipe functionality to a list item
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


