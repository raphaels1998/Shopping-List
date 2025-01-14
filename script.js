document.getElementById('masterListSection').style.display = 'none';
document.getElementById('shoppingListSection').style.display = 'none';

document.getElementById('masterListCircle').addEventListener('click', function() {
    showMasterList();
});
document.getElementById('shoppingListCircle').addEventListener('click', function() {
    showShoppingList();
});

function showMasterList() {
    document.getElementById('masterListSection').style.display = 'block';
    document.getElementById('shoppingListSection').style.display = 'none';
    
    document.getElementById('masterListCircle').classList.add('active');
    document.getElementById('shoppingListCircle').classList.remove('active');
}

function showShoppingList() {
    document.getElementById('shoppingListSection').style.display = 'block';
    document.getElementById('masterListSection').style.display = 'none';
    
    document.getElementById('shoppingListCircle').classList.add('active');
    document.getElementById('masterListCircle').classList.remove('active');
}

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
                    itemInput.value = ''; 
                    return;
                }
            }

            errorMessage.style.visibility = 'hidden';
            const listItem = document.createElement('li');
            const itemText = document.createElement('span');
            itemText.textContent = itemValue;
            listItem.appendChild(itemText);

            const addToShoppingButton = document.createElement('button');
            addToShoppingButton.textContent = 'Add to Shopping List';
            addToShoppingButton.className = 'add-to-shopping-button';
            addToShoppingButton.addEventListener('click', function() {
                addToShoppingList(itemValue);
            });
            listItem.appendChild(addToShoppingButton);

            document.getElementById('masterList').appendChild(listItem);
            itemInput.value = '';  
        }
    }
});

function addToShoppingList(itemValue) {
    const listItem = document.createElement('li');
    
    const itemText = document.createElement('span');
    itemText.textContent = itemValue;
    listItem.appendChild(itemText);
    
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.min = 1;
    amountInput.max = 999;
    amountInput.value = 1;
    amountInput.inputMode = 'numeric';  // Ensure only numbers show up on the keyboard
    listItem.appendChild(amountInput);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        listItem.remove();
    });

    addSwipeHandler(listItem);

    listItem.appendChild(deleteButton);

    document.getElementById('shoppingList').appendChild(listItem);
}

function addSwipeHandler(listItem) {
    let startX;

    listItem.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX; 
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
            setTimeout(() => listItem.remove(), 300);
        } else {
            listItem.style.transform = 'translateX(0)';
        }
    });
}


