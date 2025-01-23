// Function to show the corresponding list based on the button clicked
function showList(listType) {
    // Hide both list sections and their inputs
    document.getElementById('master-list-section').classList.remove('active');
    document.getElementById('shopping-list-section').classList.remove('active');

    // Show the corresponding list section based on the listType parameter
    if (listType === 'master') {
        document.getElementById('master-list-section').classList.add('active');
    } else if (listType === 'shopping') {
        document.getElementById('shopping-list-section').classList.add('active');
    }
}

// Ensure Master List is shown by default on page load
window.onload = function() {
    showList('master');
};

// Function to create a temporary pop-up message
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000); // Remove the pop-up after 3 seconds
    
function addItem(listType) {
    let input, list;
    
    if (listType === 'master') {
        input = document.getElementById('master-input');
        list = document.getElementById('master-list');
    } else if (listType === 'shopping') {
        input = document.getElementById('shopping-input');
        list = document.getElementById('shopping-list');
    }

    const value = input.value.trim().toLowerCase();
    
    // Validate input
    const regex = /^[a-z ]+$/;
    if (regex.test(value)) {
        // Check if the item already exists in the list
        const items = list.getElementsByTagName('li');
        let duplicate = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].childNodes[0] && items[i].childNodes[0].nodeValue.trim().toLowerCase() === value) {
                showPopup("Item already in list.");
                duplicate = true;
                break;
            }
        }

        if (!duplicate) {
            const li = document.createElement('li');
            li.textContent = value;

            // Only add "Add to Cart" button for master list
            if (listType === 'master') {
                const addButton = document.createElement('button');
                addButton.textContent = "Add to Cart";
                addButton.classList.add('add-to-cart');
                addButton.onclick = function() {
                    addToCart(value);
                };
                li.appendChild(addButton);
            }

            // Add quantity input field if it's the shopping list
            if (listType === 'shopping') {
                const quantityInput = document.createElement('input');
                quantityInput.type = 'tel';  // Triggers the phone number keypad on mobile
                quantityInput.placeholder = 'Qty (1-99)';
                quantityInput.maxLength = 2;  // Restrict input to 2 digits

                // Validate input to ensure it's a number between 1 and 99
                quantityInput.addEventListener('input', function () {
                    let value = quantityInput.value;
                    if (value < 1 || value > 99) {
                        quantityInput.setCustomValidity('Please enter a number between 1 and 99');
                    } else {
                        quantityInput.setCustomValidity('');
                    }
                });

                li.appendChild(quantityInput);
            }

            list.appendChild(li);
        } else {
            showPopup("Duplicate item.");
        }
    } else {
        showPopup("Invalid input");
    }
    input.value = ''; // Clear the input field
}

function addToCart(item) {
    const shoppingList = document.getElementById('shopping-list');
    const items = shoppingList.getElementsByTagName('li');
    let duplicate = false;
    
    // Check for duplicates in the shopping list
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.trim().toLowerCase() === item.trim().toLowerCase()) {
            duplicate = true;
            break;
        }
    }

    if (!duplicate) {
        const li = document.createElement('li');
        li.textContent = item;

        // Add the quantity input field for the shopping list
        const quantityInput = document.createElement('input');
        quantityInput.type = 'tel';  // Triggers the phone number keypad on mobile
        quantityInput.placeholder = 'Qty (1-99)';
        quantityInput.maxLength = 2;  // Restrict input to 2 digits

        // Validate input to ensure it's a number between 1 and 99
        quantityInput.addEventListener('input', function () {
            let value = quantityInput.value;
            if (value < 1 || value > 99) {
                quantityInput.setCustomValidity('Please enter a number between 1 and 99');
            } else {
                quantityInput.setCustomValidity('');
            }
        });

        li.appendChild(quantityInput);
        shoppingList.appendChild(li);
    } else {
        showPopup("Item already in shopping list.");
    }
}

// Add event listeners for both input fields
document.getElementById('master-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem('master');
    }
});

document.getElementById('shopping-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem('shopping');
    }
});
